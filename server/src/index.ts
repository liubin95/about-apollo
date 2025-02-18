import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { Resolvers, Category } from './__generated__/resolvers-types.js'

// deal __dirname is not defined
const __dirname = import.meta.dirname
//模式是类型定义的集合（因此“ Typedefs”）
//共同定义针对执行的查询的“形状”
const typeDefs = readFileSync(join(__dirname, '../../shared/', 'schema.graphql'), 'utf-8')

export interface MyContext {
  // Add your custom context properties here
  // 这里添加你的自定义上下文属性
  userId: string
  scopes: string[]
}

// 这里定义你的 GraphQL resolvers
const resolvers: Resolvers = {
  Query: {
    movie: async (_, { id }, { userId, scopes }) => {
      // 在这里添加你的查询逻辑
      // 返回电影数据
      return {
        id,
        title: `Inception ${userId}`,
        releaseDate: 2010,
        category: Category.Action,
        actors: [],
      }
    },
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    // 在这里添加你的自定义上下文逻辑
    // 例如，从请求头中提取用户 ID 和作用域
    const token = req.headers.authorization || ''
    const userId = '123' // 从 token 中提取用户 ID
    const scopes = ['movies:read', 'movies:write'] // 从 token 中提取作用域
    // optionally block the user
    // we could also check user roles/permissions here
    if (!userId) {
      // throwing a `GraphQLError` here allows us to specify an HTTP status code,
      // standard `Error`s will have a 500 status code by default
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      })
    }
    return { userId, scopes }
  },
})

console.log(`🚀  Server ready at: ${url}`)
