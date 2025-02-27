import { auth } from '@/auth.ts'
import { useUserStore } from '@/stores/user.ts'
import { Observable } from '@apollo/client/core'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'

// https://www.apollographql.com/docs/react/api/link/introduction
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: '/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  console.debug('authLink', operation, forward)
  // 从 localStorage 或其他存储中获取 token
  const token = useUserStore().getToken()
  operation.setContext({
    headers: {
      authorization: token,
    },
  })
  return forward(operation)
})

const roundTripLink = new ApolloLink((operation, forward) => {
  console.debug('roundTripLink', operation, forward)
  // Called before operation is sent to server
  operation.setContext({ start: new Date().getTime() })

  return forward(operation).map((data) => {
    // Called after server responds
    const time = new Date().getTime() - operation.getContext().start
    console.log(`Operation ${operation.operationName} took ${time} to complete`)
    return data
  })
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  console.debug('errorLink', operation, forward)
  if (graphQLErrors) {
    for (let error of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
      )
      switch (error?.extensions?.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':
          const userStore = useUserStore()
          if (!userStore.getRefreshToken()) {
            // 如果没有 refreshToken，可以在这里处理跳转到登录页
            window.location.href = '/login?redirect=' + window.location.pathname
            return
          }
          // 返回新的 Observable 来处理 token 刷新和重试
          return new Observable((observer) => {
            // 使用 refreshToken 获取新的 token
            auth
              .refreshToken(userStore.refreshToken)
              .then((res) => {
                userStore.setToken(res)
                // 更新请求头中的 token
                const oldHeaders = operation.getContext().headers
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: userStore.token,
                  },
                })
                // 重试原始请求
                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                })
              })
              .catch((error) => {
                // 如果刷新 token 失败，重定向到登录页
                observer.error(error)
                window.location.href = '/login?redirect=' + window.location.pathname
              })
          })
      }
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([errorLink, roundTripLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
