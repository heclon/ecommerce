import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fastify from 'fastify'
import compression from 'fastify-compress'
import cookie from 'fastify-cookie'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'
import type { IncomingMessage, Server, ServerResponse } from 'http'
import mercurius from 'mercurius'
import MercuriusGQLUpload from 'mercurius-upload'
import pino from 'pino'
import { createContext, GraphQLContext } from './context'
import schema from './schema'
import { getAccessToken, getSession } from '@auth0/nextjs-auth0'

type GraphQLServer = FastifyInstance<Server, IncomingMessage, ServerResponse, pino.Logger>

export const initServer = async (): Promise<GraphQLServer> => {
  const app = fastify({
    trustProxy: true,
    logger: pino({
      redact: ['headers.cookie', 'headers.authorization', 'args.password', 'args.currentPassword', 'args.newPassword'],
      level: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? 'debug' : 'info',
    }),
  })

  app.register(helmet)
  app.register(cookie)
  app.register(compression, { inflateIfDeflated: true, encodings: ['gzip', 'deflate'] })

  function getOrigin(): RegExp | RegExp[] | string {
    switch (process.env.RACK) {
      case 'staging':
        return [/studio\.apollographql\.com/, /\.ecommerce\.com\.au/, /^https:\/\/staging(.*)(ecommerce.com.au)$/]
      case 'production':
        return [/studio\.apollographql\.com/, /\.ecommerce\.com\.au/]
      default:
        return [/localhost/, /(192\.168.*)/]
    }
  }

  app.register(cors, {
    origin: getOrigin(),
    credentials: true,
    hideOptionsRoute: false,
  })

  app.register(rateLimit, {
    max: 500,
    timeWindow: 60 * 1000,
  })

  app.register(MercuriusGQLUpload)

  app.register(mercurius, {
    schema,
    queryDepth: 7,
    graphiql: false,
    path: '/api',
    allowBatchedQueries: true,
    context: async (request: FastifyRequest, reply: FastifyReply): Promise<GraphQLContext> => {
      await getAccessToken(request.raw, reply.raw, {
        refresh: true,
      })
      const session = await getSession(request.raw, reply.raw)
      const context = await createContext({ request, reply, session })
      return {
        ...context,
      }
    },
    errorFormatter: (error, ctx) => {
      if (error.errors) {
        error.errors.forEach((e) => ctx.app.log.error(e))
      } else {
        ctx.app.log.error(error)
      }
      return mercurius.defaultErrorFormatter(error, ctx)
    },
  })

  return app
}
