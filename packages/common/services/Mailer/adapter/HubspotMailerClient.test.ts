import { createHubspotMailerClient } from './HubspotMailerClient'
import { overrideProcessEnv, partialMock } from '@ecommerce/common/__test-utils__/jest-extensions'
import { Client } from '@hubspot/api-client'
import { SendEmailInput } from '../MailerClient'
import faker from 'faker/locale/en'

const mockHubspotSdkClient = partialMock<Client>({
  marketing: {
    transactional: {
      singleSendApi: {
        sendEmail: jest.fn(),
      },
    },
  },
})

jest.mock('@hubspot/api-client', () => {
  return {
    __esModule: true,
    Client: jest.fn().mockImplementation(() => {
      return mockHubspotSdkClient
    }),
  }
})

describe('HubspotMailerClient', () => {
  let originalProcessEnv: typeof process.env

  const fakeEmailInput: SendEmailInput = {
    emailId: 0,
    message: {
      _from: faker.internet.email(),
      to: '',
      sendId: '123',
      replyTo: [faker.internet.email()],
      cc: [faker.internet.email()],
      bcc: [faker.internet.email()],
    },
    customProperties: {
      test: 'fake',
    },
    contactProperties: {
      something: 'else',
    },
  }

  beforeEach(() => {
    originalProcessEnv = overrideProcessEnv({
      HUBSPOT_ACCESS_TOKEN: 'fake-token',
    })

    jest.mocked(mockHubspotSdkClient.marketing.transactional.singleSendApi.sendEmail).mockResolvedValue({
      statusId: '123',
      status: 'PENDING',
    })
  })

  afterEach(() => {
    process.env = originalProcessEnv
    jest.clearAllMocks()
  })

  it('should create a new hubspot client with the correct token, or default to a placeholder', async () => {
    createHubspotMailerClient()

    expect(Client.prototype.constructor).toHaveBeenCalledTimes(1)
    expect(Client.prototype.constructor).toHaveBeenCalledWith({ accessToken: 'fake-token' })

    overrideProcessEnv({
      HUBSPOT_ACCESS_TOKEN: undefined,
    })
    createHubspotMailerClient()

    expect(Client.prototype.constructor).toHaveBeenCalledTimes(2)
    expect(Client.prototype.constructor).toHaveBeenNthCalledWith(2, { accessToken: 'fake-hubspot-access-token' })
  })

  it('should send emails using the transactional email api', async () => {
    const result = await createHubspotMailerClient().sendEmail(fakeEmailInput)

    expect(result).toEqual({
      statusId: '123',
      status: 'PENDING',
    })
    expect(mockHubspotSdkClient.marketing.transactional.singleSendApi.sendEmail).toHaveBeenCalledTimes(1)
    expect(mockHubspotSdkClient.marketing.transactional.singleSendApi.sendEmail).toHaveBeenCalledWith(fakeEmailInput)
  })

  it('any errors thrown should bubble up', async () => {
    const fakeError = new Error('fake')

    jest.mocked(mockHubspotSdkClient.marketing.transactional.singleSendApi.sendEmail).mockRejectedValue(fakeError)

    expect(createHubspotMailerClient().sendEmail(fakeEmailInput)).rejects.toThrowError(fakeError)
  })
})
