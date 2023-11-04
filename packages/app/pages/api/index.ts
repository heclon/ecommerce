import { withSentry } from '@sentry/nextjs'
import type { FastifyInstance } from 'fastify'
import type { NextApiRequest, NextApiResponse } from 'next'
import { initServer } from '../../server'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

let app: FastifyInstance | undefined
const readyApp = async (): Promise<FastifyInstance> => {
  if (!app) {
    app = await initServer()
    await app.ready()
  }
  return app
}

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  ;(await readyApp()).server.emit('request', req, res)
}

export default withSentry(handler)
