import { MailerService } from '..'
import { partialMock } from '../../../__test-utils__/jest-extensions'
import { SendResult } from '../MailerClient'

const fakeResult: SendResult = { status: 'PENDING', statusId: '' }

export const mockMailerService = partialMock<MailerService>({
  sendParticipantOffer: jest.fn().mockResolvedValue(fakeResult),
  sendOfferAccepted: jest.fn().mockResolvedValue(fakeResult),
  sendOfferAcceptedParticipantConfirmation: jest.fn().mockResolvedValue(fakeResult),
  sendProchoServiceRequestAcknowledgement: jest.fn().mockResolvedValue(fakeResult),
  sendFollowUpEmail: jest.fn().mockResolvedValue(fakeResult),
  sendOfferDelayEmail: jest.fn().mockResolvedValue(fakeResult),
  sendProviderWelcomeEmail: jest.fn().mockResolvedValue(fakeResult),
  sendParticipantWelcomeEmail: jest.fn().mockResolvedValue(fakeResult),
  sendServiceInvite: jest.fn().mockResolvedValue(fakeResult),
  sendServiceIntroductoryEmail: jest.fn().mockResolvedValue(fakeResult),
})
