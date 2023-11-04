import { MailerService } from './MailerService'
import faker from 'faker/locale/en'
import { MailerClient, SendResult } from './MailerClient'
import { overrideProcessEnv, partialMock } from '../../__test-utils__/jest-extensions'
import { providerServiceInviteFactory, providerServiceOfferFactory, userFactory } from '../../__test-utils__/factories'
import { createEntityManager, runWithEntityManager } from '../../__test-utils__/database-entity-manager'
import { User } from '@prisma/client'
import { analytics } from '../Segment'

faker.seed(123)

jest.mock('../../services/Segment', () => {
  return {
    analytics: {
      track: jest.fn(),
    },
  }
})

jest.mock('../logger.ts')

describe('MailerService', () => {
  let originalProcessEnv: typeof process.env

  const mockMailerServiceClient: MailerClient = {
    sendEmail: jest.fn(),
  }
  const mailer = new MailerService(mockMailerServiceClient)
  const entityManager = createEntityManager()
  const fakeMailClientResponse = partialMock<SendResult>({ status: 'PENDING' })
  let fakeParticipantUser: User

  const fakeParticipantEmail = 'fake-participant@gmail.com'
  const fakeHubspotEmail = 'fake-hubspot@gmail.com'
  const firstSessionTime = new Date('1999-03-06T20:45:53.093Z')

  beforeAll(async () => {
    jest.mocked(mockMailerServiceClient.sendEmail).mockResolvedValue(fakeMailClientResponse)

    await runWithEntityManager(entityManager, async () => {
      fakeParticipantUser = await userFactory.create({ email: fakeParticipantEmail })
    })
  })

  beforeEach(() => {
    originalProcessEnv = overrideProcessEnv({
      HUBSPOT_DEV_EMAIL: fakeHubspotEmail,
    })
  })

  afterEach(() => {
    process.env = originalProcessEnv
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await entityManager.deleteAll()
  })

  describe('sendParticipantOffer', () => {
    const fakeServiceOffer = providerServiceOfferFactory.buildWithInviteAndRequest({
      activeUserEmail: fakeParticipantEmail,
      firstSessionAt: firstSessionTime,
    })

    it('should call the sendEmail on the mail client with the correct email data', async () => {
      const result = await mailer.sendParticipantOffer(fakeServiceOffer)

      expect(result).toEqual(fakeMailClientResponse)
      expect(mockMailerServiceClient.sendEmail).toHaveBeenCalledTimes(1)
      expect(jest.mocked(mockMailerServiceClient.sendEmail).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "contactProperties": Object {},
            "customProperties": Object {
              "invite_id": "88azmr3rf1f6h5f2",
              "offer_additionalInformation": "Eligendi in deserunt.
        Harum sit odio quia vitae provident quo provident.
        Harum ullam pariatur quos est quod.",
              "offer_id": "ppaf8ojpphfszeok",
              "offer_time": "1999-03-06T20:45:53.093Z",
              "offer_willingToTravel": "Unknown",
              "participant_givenName": "Jovanny",
              "provider_email": "Francesca_Hintz@hotmail.com",
              "provider_id": "Unknown",
              "provider_name": "Herzog - Reichert",
              "provider_phone": "(651) 434-4689 x214",
              "request_id": "PK_9Wn[:_Ro1(>hs713N",
              "request_supportName": "Physiotherapy",
              "user_givenName": "Mariano",
            },
            "emailId": 73757991974,
            "message": Object {
              "to": "fake-hubspot@gmail.com",
            },
          },
        ]
      `
      )
    })

    it('should register an Email Sent analytics event', async () => {
      await mailer.sendParticipantOffer(fakeServiceOffer)

      expect(analytics.track).toHaveBeenCalledTimes(1)
      expect(jest.mocked(analytics.track).mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "event": "ecommerce Service Request P3 Email Sent",
            "properties": Object {
              "hubspotResponse": "{\\"status\\":\\"PENDING\\"}",
              "providerServiceInviteId": "88azmr3rf1f6h5f2",
              "providerServiceRequestId": "PK_9Wn[:_Ro1(>hs713N",
              "to": "fake-participant@gmail.com",
            },
            "userId": "RP2jhhbU,)dM[a!$%ES)",
          },
        ]
      `)
    })
  })

  describe('sendServiceInvite', () => {
    const fakeServiceInvite = providerServiceInviteFactory.buildWithRequest({
      activeUserEmail: fakeParticipantEmail,
    })

    it('should call the mail client with invite email data', async () => {
      const result = await mailer.sendServiceInvite(fakeParticipantUser.auth0Id, fakeServiceInvite)

      expect(result).toEqual(fakeMailClientResponse)
      expect(mockMailerServiceClient.sendEmail).toHaveBeenCalledTimes(1)
      expect(jest.mocked(mockMailerServiceClient.sendEmail).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "contactProperties": Object {},
            "customProperties": Object {
              "invite_rate": "15",
              "participant_address": "Amarillo",
              "participant_age": "9",
              "participant_givenName": "Laney",
              "request_availability": "Saturday IDontMind, Thursday IDontMind",
              "request_description": "et sit qui amet voluptatem placeat sed accusamus nihil iusto nesciunt aliquid sed reprehenderit ducimus dolor eaque commodi maiores quia vel enim eum est",
              "request_disabilities": ", ",
              "request_hoursPerWeek": "1 hr",
              "request_id": "V5C<,nhCI(E3]qB{J9f_",
              "request_otherIssues": "Anxiety, Trouble Sleeping",
              "request_supportName": "Physiotherapy",
              "request_travel": "No",
              "user_givenName": "Chase",
            },
            "emailId": 72554523493,
            "message": Object {
              "to": "fake-hubspot@gmail.com",
            },
          },
        ]
      `
      )
    })

    it('should register a P2 email sent analytics event', async () => {
      await mailer.sendServiceInvite(fakeParticipantUser.auth0Id, fakeServiceInvite)

      expect(analytics.track).toHaveBeenCalledTimes(1)
      expect(jest.mocked(analytics.track).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "event": "ecommerce Service Request P2 Email Sent",
            "properties": Object {
              "hubspotResponse": "{\\"status\\":\\"PENDING\\"}",
              "providerServiceInviteId": "kbrxqy0ux54fy837",
              "providerServiceRequestId": "V5C<,nhCI(E3]qB{J9f_",
              "to": "fake-hubspot@gmail.com",
            },
            "userId": "RP2jhhbU,)dM[a!$%ES)",
          },
        ]
      `
      )
    })
  })

  describe('sendServiceIntroductoryEmail', () => {
    const fakeServiceInvite = providerServiceInviteFactory.buildWithRequest({
      activeUserEmail: fakeParticipantEmail,
    })

    it('should call the mail client with the correct invite data', async () => {
      const result = await mailer.sendServiceIntroductoryEmail(fakeParticipantUser.auth0Id, fakeServiceInvite)

      expect(result).toEqual(fakeMailClientResponse)
      expect(mockMailerServiceClient.sendEmail).toHaveBeenCalledTimes(1)
      expect(jest.mocked(mockMailerServiceClient.sendEmail).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "contactProperties": Object {},
            "customProperties": Object {
              "invite_rate": "15",
              "participant_address": "Lake Adeliahaven",
              "participant_age": "55",
              "participant_givenName": "Dejuan",
              "request_availability": "Monday Evening, Wednesday Afternoon",
              "request_description": "quos reprehenderit neque et eos labore ipsum aut veritatis inventore sed ut sed sed aut aut aut ut repellat natus a voluptatibus aut hic",
              "request_disabilities": ", , Autism",
              "request_hoursPerWeek": "1 hr",
              "request_id": "@<Hdv)P}-=NSPj>7X@=4",
              "request_otherIssues": "Depression",
              "request_supportName": "Speech Pathology",
              "request_travel": "No",
              "user_givenName": "Danielle",
            },
            "emailId": 73755701306,
            "message": Object {
              "to": "fake-hubspot@gmail.com",
            },
          },
        ]
      `
      )
    })

    it('should register a P2.5 Email sent analytics event', async () => {
      await mailer.sendServiceIntroductoryEmail(fakeParticipantUser.auth0Id, fakeServiceInvite)

      expect(analytics.track).toHaveBeenCalledTimes(1)
      expect(jest.mocked(analytics.track).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "event": "ecommerce Service Request P2.5 Email Sent",
            "properties": Object {
              "hubspotResponse": "{\\"status\\":\\"PENDING\\"}",
              "providerServiceInviteId": "1tm4ub9zz1vp759d",
              "providerServiceRequestId": "@<Hdv)P}-=NSPj>7X@=4",
              "to": "fake-hubspot@gmail.com",
            },
            "userId": "RP2jhhbU,)dM[a!$%ES)",
          },
        ]
      `
      )
    })
  })

  describe('sendOfferAccepted', () => {
    const fakeServiceOffer = providerServiceOfferFactory.buildWithInviteAndRequest({
      activeUserEmail: fakeParticipantEmail,
      firstSessionAt: firstSessionTime,
    })
    const fakeBcc = [faker.internet.email()]

    it('should call the mail client with the correct email data', async () => {
      const result = await mailer.sendOfferAccepted(fakeServiceOffer, fakeBcc)

      expect(result).toEqual(fakeMailClientResponse)
      expect(mockMailerServiceClient.sendEmail).toHaveBeenCalledTimes(1)
      expect(jest.mocked(mockMailerServiceClient.sendEmail).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "contactProperties": Object {},
            "customProperties": Object {
              "invite_id": "edptnpsvw09ai05y",
              "offer_additionalInformation": "Totam aliquam sed qui consequuntur doloremque.
        Aut at quae consequatur sunt repellendus iure sed et.
        Maxime voluptatum laboriosam quo ut alias.",
              "offer_id": "ot6qjteqtv4gq99m",
              "offer_time": "1999-03-06T20:45:53.093Z",
              "offer_willingToTravel": "Unknown",
              "participant_givenName": "Brenden",
              "provider_email": "Dean_Mitchell52@hotmail.com",
              "provider_name": "Berge, Parisian and Spencer",
              "provider_phone": "1-649-813-9053",
              "request_id": "-E!993or,OhVwXU\\\\sQ8)",
              "request_supportName": "Physiotherapy",
              "user_email": "fake-participant@gmail.com",
              "user_givenName": "Amiya",
              "user_phone": "302-356-3669",
            },
            "emailId": 73065232412,
            "message": Object {
              "bcc": Array [],
              "to": "fake-hubspot@gmail.com",
            },
          },
        ]
      `
      )
    })

    it('should register an analytics event', async () => {
      await mailer.sendOfferAccepted(fakeServiceOffer, fakeBcc)

      expect(analytics.track).toHaveBeenCalledTimes(1)
      expect(jest.mocked(analytics.track).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "event": "ecommerce Service Request P4 Email Sent",
            "properties": Object {
              "bcc": Array [
                "Liana44@hotmail.com",
              ],
              "hubspotResponse": "{\\"status\\":\\"PENDING\\"}",
              "providerServiceInviteId": "edptnpsvw09ai05y",
              "providerServiceRequestId": "-E!993or,OhVwXU\\\\sQ8)",
              "to": "fake-hubspot@gmail.com",
            },
            "userId": "RP2jhhbU,)dM[a!$%ES)",
          },
        ]
      `
      )
    })
  })

  describe('sendOfferAcceptedParticipantConfirmation', () => {
    const fakeServiceOffer = providerServiceOfferFactory.buildWithInviteAndRequest({
      activeUserEmail: fakeParticipantEmail,
      firstSessionAt: firstSessionTime,
    })
    const fakeBcc = [faker.internet.email()]

    it('should call the mail client with the correct email data', async () => {
      const result = await mailer.sendOfferAcceptedParticipantConfirmation(fakeServiceOffer, fakeBcc)

      expect(result).toEqual(fakeMailClientResponse)
      expect(mockMailerServiceClient.sendEmail).toHaveBeenCalledTimes(1)
      expect(jest.mocked(mockMailerServiceClient.sendEmail).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "contactProperties": Object {},
            "customProperties": Object {
              "provider_email": "Ryann61@gmail.com",
              "provider_name": "Schaden, Heathcote and Ryan",
              "provider_phone": "520-881-1300 x237",
              "support_name": "Physiotherapy",
            },
            "emailId": 72578005419,
            "message": Object {
              "bcc": Array [],
              "to": "fake-hubspot@gmail.com",
            },
          },
        ]
      `
      )
    })

    it('should register an analytics event', async () => {
      await mailer.sendOfferAcceptedParticipantConfirmation(fakeServiceOffer, fakeBcc)

      expect(analytics.track).toHaveBeenCalledTimes(1)
      expect(jest.mocked(analytics.track).mock.calls[0]).toMatchInlineSnapshot(
        `
        Array [
          Object {
            "event": "ecommerce Service Request P6 Email Sent",
            "properties": Object {
              "bcc": Array [
                "Newell_Gibson52@yahoo.com",
              ],
              "hubspotResponse": "{\\"status\\":\\"PENDING\\"}",
              "providerServiceInviteId": "d1shkvxtvp9u3qr0",
              "providerServiceRequestId": "yEY4TjWlnARm)by+OCyp",
              "to": "fake-hubspot@gmail.com",
            },
            "userId": "RP2jhhbU,)dM[a!$%ES)",
          },
        ]
      `
      )
    })
  })
})
