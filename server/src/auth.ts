import { BaseContext } from '@apollo/server'
import { GraphQLError } from 'graphql/index.js'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { MutationResolvers, QueryResolvers } from './__generated__/resolvers-types.js'
import { prisma } from './database.js'

export interface MyContext extends BaseContext {
  // Add your custom context properties here
  // 这里添加你的自定义上下文属性
  userId: number
  scopes: string[]
}

class Auth {
  private readonly secretOrPrivateKey = 'secretOrPrivateKey'
  private readonly whiteList = ['login', 'refreshToken', '__schema']
  private readonly tokenExpiresIn = '1h'
  private readonly refreshTokenExpiresIn = '1d'

  throwError = (code: 401 | 403 | 500, message?: string) => {
    switch (code) {
      case 401:
        throw new GraphQLError(message, {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        })
      case 403:
        throw new GraphQLError(message, {
          extensions: {
            code: 'FORBIDDEN',
            http: { status: 403 },
          },
        })
      case 500:
        throw new GraphQLError(message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
          },
        })
      default:
        throw new GraphQLError(message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
          },
        })
    }
  }
  private signToken = (payload: JwtPayload) => {
    payload = {
      userId: payload.userId,
    }
    const token = jwt.sign(payload, this.secretOrPrivateKey, { expiresIn: this.tokenExpiresIn })
    const refreshToken = jwt.sign(payload, this.secretOrPrivateKey, {
      expiresIn: this.refreshTokenExpiresIn,
    })
    return {
      token,
      refreshToken,
    }
  }

  login: MutationResolvers['login'] = async (_parent, { email, password }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user || user.password !== password) {
      this.throwError(500, 'Invalid email or password')
    }
    // jwt token
    const payload = {
      userId: user.id,
    }
    return this.signToken(payload)
  }

  me: QueryResolvers['me'] = async (_parent, _args, { userId }) => {
    if (!userId) {
      this.throwError(401)
    }
    return prisma.user.findUnique({
      where: { id: userId },
    })
  }

  checkToken = async (token: string, operationName?: string[]): Promise<JwtPayload> => {
    const inWhiteList =
      operationName === undefined
        ? true
        : operationName.every((item) => this.whiteList.includes(item))
    let payload = {}
    try {
      payload = jwt.verify(token, this.secretOrPrivateKey, { complete: false }) as JwtPayload
    } catch (e) {
      console.error('checkToken', token, e)
      if (!inWhiteList) {
        this.throwError(401)
      }
    }
    return payload
  }

  refreshToken: MutationResolvers['refreshToken'] = async (_parent, { refreshToken }) => {
    if (!refreshToken) {
      this.throwError(401)
    }
    const payload = await this.checkToken(refreshToken)
    return this.signToken(payload)
  }
}

export const auth = new Auth()
