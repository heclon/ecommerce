import { z } from 'zod'
import { Client } from '@hubspot/api-client'
import { MailerClient } from '../MailerClient'

const parseEnvConfig = () =>
  z
    .object({
      HUBSPOT_ACCESS_TOKEN: z.string().min(1).optional().default('fake-hubspot-access-token'),
    })
    .parse(process.env)

/** Creates an adapter for the MailerClient, implemented by Hubspot SDK https://github.com/HubSpot/hubspot-api-nodejs */
export function createHubspotMailerClient(): MailerClient {
  const envConfig = parseEnvConfig()
  const hubspotClient = new Client({ accessToken: envConfig.HUBSPOT_ACCESS_TOKEN })

  return {
    sendEmail: async (input) => {
      return hubspotClient.marketing.transactional.singleSendApi.sendEmail(input)
    },
  }
}
