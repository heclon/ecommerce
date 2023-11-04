import Fastify from 'fastify'
import { FastifyInstance } from 'fastify/types/instance'
import mercurius from 'mercurius'
import MercuriusGQLUpload from 'mercurius-upload'
import { GraphQLContext } from '../../context'
import schema from '../../schema'
import createFakeContext, { SessionOptions } from '../context'

const createTestServer = async (
  sessionOptions: SessionOptions = {}
): Promise<{
  server: FastifyInstance
  context: GraphQLContext
}> => {
  const server = Fastify()
  const fakeContext = await createFakeContext(sessionOptions)
  server.register(MercuriusGQLUpload)

  server.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: false,
    context: () => fakeContext,
    allowBatchedQueries: true,
  })

  return {
    server,
    context: fakeContext,
  }
}

export default createTestServer
