import { gql } from '@/__generated__'
import { apolloClient } from '@/apollo-client.ts'
import { type TokenInfo } from '@/stores/user.ts'

class Auth {
  private readonly refreshTokenMutation = gql(/* GraphQL */ `
    mutation refreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        refreshToken
        token
      }
    }
  `)

  refreshToken = async (refreshToken: string): Promise<TokenInfo> => {
    const result = await apolloClient.mutate({
      mutation: this.refreshTokenMutation,
      variables: {
        refreshToken,
      },
    })
    return {
      token: result?.data?.refreshToken.token ?? '',
      refreshToken: result?.data?.refreshToken.refreshToken ?? '',
    }
  }
}

export const auth = new Auth()
