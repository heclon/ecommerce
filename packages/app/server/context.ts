import { PrismaClient } from '@prisma/client'
import { PrismaClient as ProChoPrismaClient } from '@prisma/prochoClient'
import * as Sentry from '@sentry/nextjs'
import { nanoid } from 'nanoid'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { Session } from '@auth0/nextjs-auth0'
import AwsService from '@ecommerce/common/services/AwsService'
import { prisma, prochoPrisma } from '@ecommerce/common/prisma-client'
import { analytics } from '@ecommerce/common/services/Segment'
import type Analytics from 'analytics-node'

export interface GraphQLContext {
  request?: FastifyRequest
  reply?: FastifyReply
  prisma: PrismaClient
  prochoPrisma: ProChoPrismaClient
  analytics: Analytics
  auth0Id?: string
  auth0Email?: string
  permissions: string[]
  emailVerified?: boolean
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
  const { sub: auth0Id, email: auth0Email, email_verified: emailVerified, permissions = [] } = session?.user || {}
  Sentry.configureScope(function (scope) {
    scope.setUser({
      email: auth0Email,
      id: auth0Id,
      ip_address: request?.ip,
    })
  })

  return {
    correlationId,
    auth0Id,
    auth0Email,
    emailVerified,
    permissions,
    analytics,
    request,
    reply,
    prisma: prisma,
    prochoPrisma: prochoPrisma,
    services: {
      awsService: new AwsService(),
    },
  }
}
