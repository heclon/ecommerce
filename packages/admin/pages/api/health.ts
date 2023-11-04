import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const handler = (_: NextApiRequest, response: NextApiResponse) => {
  response.status(200).send(`healthy`)
}

export default withSentry(handler)
