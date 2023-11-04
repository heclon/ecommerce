import { Session } from '@auth0/nextjs-auth0'
import { PrismaClient as ProChoPrismaClient } from '@prisma/prochoClient'
import { PrismaClient } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { nanoid } from 'nanoid'
import AwsService from '@ecommerce/common/services/AwsService'
import { prisma, prochoPrisma } from '@ecommerce/common/prisma-client'

export interface GraphQLContext {
  request?: FastifyRequest
  reply?: FastifyReply
  prisma: PrismaClient
  prochoPrisma: ProChoPrismaClient
  auth0Id?: string | null
  currentSessionUserEmail?: string | null
  correlationId?: string
  services: {
    awsService: AwsService
  }
}

export async function createContext({
  request,
  reply,
  session,
}: {
  request?: FastifyRequest
  reply?: FastifyReply
  session?: Session | null
}): Promise<GraphQLContext> {
  const correlationId = nanoid()

  Sentry.configureScope(function (scope) {
    scope.setUser({
      email: session?.user?.email,
      id: session?.user?.sub,
      ip_address: request?.ip,
    })
  })

  return {
    correlationId,
    auth0Id: session?.user?.sub,
    currentSessionUserEmail: session?.user.email,
    request,
    reply,
    prisma: prisma,
    prochoPrisma: prochoPrisma,
    services: {
      awsService: new AwsService(),
    },
  }
}

export interface SuccessResponse {
  ok: boolean
}
