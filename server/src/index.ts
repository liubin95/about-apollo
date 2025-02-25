import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import * as http from 'node:http'
import { Resolvers } from './__generated__/resolvers-types.js'
import { auth, type MyContext } from './auth.js'
import { movieResolvers } from './movie.js'
import { otherResolvers } from './other.js'
import { getTypeDefs, getOperationName } from './util.js'

// 这里定义你的 GraphQL resolvers
const resolvers: Resolvers = {
  Query: {
    movies: movieResolvers.movies,
    movie: movieResolvers.movie,
    categories: otherResolvers.categories,
    countries: otherResolvers.countries,
    me: auth.me,
  },
  Mutation: {
    login: auth.login,
    refreshToken: auth.refreshToken,
  },
}
// Required logic for integrating with Express
const app = express()
const httpServer = http.createServer(app)
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs: getTypeDefs(),
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
// Ensure we wait for our server to start
await server.start()

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // 在这里添加你的自定义上下文逻辑
      // 例如，从请求头中提取用户 ID 和作用域
      const token = req.headers.authorization
      const operationName = getOperationName(req.body.query)
      const payload = await auth.checkToken(token, operationName)
      return {
        userId: payload.userId,
        scopes: [],
      }
    },
  }),
)

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`)
