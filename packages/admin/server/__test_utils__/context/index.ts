import { Session } from '@auth0/nextjs-auth0'
import { Prisma } from '@prisma/client'
import faker from 'faker/locale/en'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { mockRequest, mockResponse } from 'mock-req-res'
import { createContext } from '../../context'

export type SessionOptions = Prisma.XOR<
  {
    sub?: string | null
    permissions?: string[] | null
    email?: string | null
    email_verified?: boolean
    accessToken?: string | null
  },
  {
    accessToken: null
  }
>

const createFakeLogger = () => {
  const log = {
    child: () => log,
    error: () => {},
    info: (): void => {
      return
    },
  }
  return log
}

const createFakeContext = (sessionOptions: SessionOptions) => {
  const {
    sub = `test|${faker.random.alphaNumeric(32)}`,
    email = faker.internet.email(),
    accessToken = faker.random.alphaNumeric(32),
    email_verified = true,
  } = sessionOptions

  const request = mockRequest({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
    log: createFakeLogger(),
  }) as unknown as FastifyRequest

  const reply = mockResponse() as unknown as FastifyReply

  const session: Session = {
    user: {
      email,
      email_verified,
      sub,
    },
  }

  return createContext({ request, reply, session })
}

export default createFakeContext
