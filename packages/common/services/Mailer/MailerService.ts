import {
  JobTime,
  PlanManagementCategory,
  Prisma,
  ProviderJobTime,
  ProviderServiceInvite,
  ProviderServiceOffer,
  ProviderServiceRequest,
} from '@prisma/prochoClient'
import dayjs from 'dayjs'
import { ServiceRequestEmailSentEvents } from '../../events/ServiceRequestEvents'
import { disabilityOptions, hoursPerWeekOptions, travelOptions } from '../../options'
import { prisma } from '../../prisma-client'
import { analytics } from '../Segment'
import { generateMaskedAddress } from '../../utils/formatter'
import { logger } from '../logger'
import { createHubspotMailerClient } from './adapter/HubspotMailerClient'
import config from './config'
import type { MailerClient, SendEmailInput } from './MailerClient'

interface ProviderInviteWithRequestAndTimes extends ProviderServiceInvite {
  request: ProviderServiceRequest & {
    times?: ProviderJobTime[]
  }
}

interface ProviderServiceOfferWithInvite extends ProviderServiceOffer {
  invite: ProviderInviteWithRequestAndTimes
}

interface ProviderServiceOfferWithInviteAndRequest extends ProviderServiceOffer {
  invite: ProviderServiceInvite & {
    request: ProviderServiceRequest
  }
}

export const isProchoManaged = (planManagementCategory?: PlanManagementCategory | null): boolean => {
  const managedByProCho: PlanManagementCategory[] = [
    PlanManagementCategory.ProChoParticipant,
    PlanManagementCategory.RegisterForProCho,
    PlanManagementCategory.AnotherPMRegisterForProCho,
  ]
  return !!planManagementCategory && managedByProCho.includes(planManagementCategory)
}

const getEmailIdForParticipantOffer = (offer: ProviderServiceOfferWithInvite) => {
  const hasProviderProfile = !!(offer.hh_profile as Prisma.JsonObject)?.id
  return isProchoManaged(offer.invite.request.participantPlanManagementCategory)
    ? hasProviderProfile
      ? config.HUBSPOT_SERVICE_REQUEST_P3_WITH_PROVIDER_PROFILE_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P3_PCM
    : hasProviderProfile
    ? config.HUBSPOT_SERVICE_REQUEST_P3_WITH_PROVIDER_PROFILE_NPC
    : config.HUBSPOT_SERVICE_REQUEST_P3_NPC
}

const getRequestAvailabilityTimes = (times?: ProviderJobTime[] | null) => {
  if (!times || !times.length) return ''

  return times
    .map((t) => {
      const time = t.time === JobTime.Other ? `at ${dayjs(t.preferredTime).format('hh:mmA')}` : t.time
      return `${t.day} ${time}`
    })
    .join(', ')
}

// TODO: refactor to externalise the dependency on User object (i.e. pass it as a parameter)
const getAuth0Id = async (userEmail: string): Promise<string> => {
  const { auth0Id } = (await prisma.user.findUnique({ where: { email: userEmail }, select: { auth0Id: true } })) || {}
  return auth0Id || 'Unknown'
}

/**
 * Used for sending transactional and marketing emails.
 */
export class MailerService {
  constructor(private client: MailerClient) {}

  private async sendEmail(input: SendEmailInput) {
    return this.client.sendEmail(input)
  }

  public async sendParticipantOffer(offer: ProviderServiceOfferWithInvite) {
    const emailId = getEmailIdForParticipantOffer(offer)
    const to =
      process.env.RACK === 'production' ? offer.invite.request.activeUserEmail : process.env.HUBSPOT_DEV_EMAIL ?? ''

    const input: SendEmailInput = {
      emailId,
      message: {
        to,
      },
      contactProperties: {},
      customProperties: {
        offer_id: offer.id,
        invite_id: offer.invite.id,
        request_id: offer.invite.request.id,
        provider_name: offer.hh_providerBusinessName || offer.invite.providerName || 'Unknown',
        provider_id: String((offer.hh_profile as Prisma.JsonObject)?.id || 'Unknown'),
        provider_email: offer.invite.providerEmail || 'Unknown',
        provider_phone: offer.invite.providerPhone || 'Unknown',
        request_supportName: offer.invite.request.supportName || 'Unknown',
        offer_time: offer.firstSessionAt ? dayjs(offer.firstSessionAt).toISOString() : 'Unknown',
        offer_willingToTravel: String(offer.willingToTravel || 'Unknown'),
        offer_additionalInformation: offer.additionalInformation || 'N/A',
        user_givenName: offer.invite.request.activeUserGivenName,
        participant_givenName: offer.invite.request.participantGivenName,
      },
    }

    const emailResponse = await this.sendEmail(input)
    logger.info(`Sending Service Offer :: ${JSON.stringify(input, null, 2)}`)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP3EmailSent,
      userId: await getAuth0Id(offer.invite.request.activeUserEmail),
      properties: {
        to: offer.invite.request.activeUserEmail,
        providerServiceRequestId: offer.invite.request.id,
        providerServiceInviteId: offer.invite.id,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendOfferAccepted(
    offer: ProviderServiceOffer & {
      invite: ProviderInviteWithRequestAndTimes
    },
    bcc?: string[]
  ) {
    const emailId = isProchoManaged(offer.invite.request.participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P4_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P4_NPC

    const to = (process.env.RACK == 'production' ? offer.invite.providerEmail : process.env.HUBSPOT_DEV_EMAIL) as string
    const message = {
      to,
      bcc: this.redactBcc(bcc),
    }

    const { invite, id, hh_providerBusinessName, additionalInformation, willingToTravel, firstSessionAt } = offer
    const { request, id: inviteId, providerName, providerEmail, providerPhone } = invite
    const {
      id: requestId,
      supportName,
      activeUserEmail,
      activeUserGivenName,
      activeUserPhone,
      participantGivenName,
    } = request

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        offer_id: id,
        invite_id: inviteId,
        request_id: requestId,
        provider_name: hh_providerBusinessName || providerName || 'Unknown',
        provider_email: providerEmail || 'Unknown',
        provider_phone: providerPhone || 'Unknown',
        request_supportName: supportName || 'Unknown',
        offer_time: firstSessionAt ? dayjs(firstSessionAt).toISOString() : 'Unknown',
        offer_willingToTravel: String(willingToTravel || 'Unknown'),
        offer_additionalInformation: additionalInformation || 'N/A',
        user_givenName: activeUserGivenName || 'Unknown',
        user_phone: activeUserPhone || 'Unknown',
        user_email: activeUserEmail || 'Unknown',
        participant_givenName: participantGivenName || 'Unknown',
      },
    }

    logger.info(`Sending Offer Accepted :: ${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP4EmailSent,
      userId: await getAuth0Id(activeUserEmail),
      properties: {
        to,
        bcc,
        providerServiceRequestId: requestId,
        providerServiceInviteId: inviteId,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendOfferAcceptedParticipantConfirmation(
    offer: ProviderServiceOffer & {
      invite: ProviderInviteWithRequestAndTimes
    },
    bcc?: string[]
  ) {
    const emailId = isProchoManaged(offer.invite.request.participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P6_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P6_NPC
    const to = (
      process.env.RACK == 'production' ? offer.invite.request.activeUserEmail : process.env.HUBSPOT_DEV_EMAIL
    ) as string
    const message = {
      to,
      bcc: this.redactBcc(bcc),
    }
    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        provider_name: offer.hh_providerBusinessName || offer.invite.providerName || 'Unknown',
        provider_email: offer.invite.providerEmail || 'Unknown',
        provider_phone: offer.invite.providerPhone || 'Unknown',
        support_name: offer.invite.request.supportName || 'Unknown',
      },
    }

    logger.info(`Sending Offer Accepted :: ${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP6EmailSent,
      userId: await getAuth0Id(offer.invite.request.activeUserEmail),
      properties: {
        to,
        bcc,
        providerServiceRequestId: offer.invite.request.id,
        providerServiceInviteId: offer.invite.id,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendProchoServiceRequestAcknowledgement(request: ProviderServiceRequest) {
    const { participantPlanManagementCategory, activeUserEmail, activeUserGivenName, participantAddress } = request

    const emailId = isProchoManaged(participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P1_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P1_NPC

    const to = (process.env.RACK == 'production' ? activeUserEmail : process.env.HUBSPOT_DEV_EMAIL) as string

    const message = {
      to,
    }

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        request_id: request.id,
        user_givenName: activeUserGivenName,
        request_supportName: request.supportName,
        participant_address: String(participantAddress ?? ''),
        participant_region: String(participantAddress ? generateMaskedAddress(participantAddress) : ''),
      },
    }
    logger.info(`Sending Service Request Acknowledgement :: ${JSON.stringify(input, null, 2)}`)
    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP1EmailSent,
      userId: await getAuth0Id(activeUserEmail),
      properties: {
        to,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendFollowUpEmail(offer: ProviderServiceOfferWithInviteAndRequest) {
    const { participantPlanManagementCategory, activeUserEmail } = offer.invite.request
    const emailId = isProchoManaged(participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P7_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P7_NPC

    const to = (process.env.RACK == 'production' ? activeUserEmail : process.env.HUBSPOT_DEV_EMAIL) as string

    const message = {
      to,
    }

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        provider_name: offer.hh_providerBusinessName || offer.invite.providerName || 'Unknown',
      },
    }
    logger.info(`Sending Service Follow Up  \n${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP7EmailSent,
      userId: await getAuth0Id(offer.invite.request.activeUserEmail),
      properties: {
        to,
        providerServiceRequestId: offer.invite.request.id,
        providerServiceInviteId: offer.invite.id,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendOfferDelayEmail(request: ProviderServiceRequest) {
    const { id: providerServiceRequestId, participantPlanManagementCategory, activeUserEmail, supportName } = request
    const emailId = isProchoManaged(participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P5_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P5_NPC
    const to = (process.env.RACK == 'production' ? activeUserEmail : process.env.HUBSPOT_DEV_EMAIL) as string
    const message = {
      to,
    }

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        request_supportName: supportName,
      },
    }
    logger.info(`Sending Service Delay :: ${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP5EmailSent,
      userId: await getAuth0Id(request.activeUserEmail),
      properties: {
        to,
        providerServiceRequestId,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendProviderWelcomeEmail(email: string) {
    const to = (process.env.RACK == 'production' ? email : process.env.HUBSPOT_DEV_EMAIL) as string
    return this.sendEmail({
      emailId: config.HUBSPOT_PROVIDER_WELCOME,
      message: {
        to,
      },
    })
  }

  public async sendParticipantWelcomeEmail(email: string) {
    const to = (process.env.RACK == 'production' ? email : process.env.HUBSPOT_DEV_EMAIL) as string
    return this.sendEmail({
      emailId: config.HUBSPOT_PARTICIPANT_WELCOME,
      message: {
        to,
      },
    })
  }

  public async sendServiceInvite(userId: string, invite: ProviderInviteWithRequestAndTimes) {
    const {
      participantPlanManagementCategory,
      participantAddress,
      participantDateOfBirth,
      activeUserGivenName,
      participantGivenName,
      times,
    } = invite.request

    const emailId = isProchoManaged(participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P2_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P2_NPC

    const to = (process.env.RACK == 'production' ? invite.providerEmail : process.env.HUBSPOT_DEV_EMAIL) as string
    const message = {
      to,
    }

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        request_id: invite.request.id,
        request_supportName: invite.request.supportName,
        request_description: invite.request.description,
        request_disabilities: invite.request.disabilities
          .map((d) => disabilityOptions.find((o) => o.value == d)?.label)
          .join(', '),
        request_otherIssues: invite.request.otherIssues.join(', '),
        request_hoursPerWeek:
          hoursPerWeekOptions.find((option) => option.value === invite.request.hoursPerWeek)?.label ?? '',
        participant_address: generateMaskedAddress(participantAddress || ''),
        request_travel: travelOptions.find((to) => to.value == invite.request.travel)?.label ?? '',
        participant_age: dayjs().diff(participantDateOfBirth, 'year').toString(),
        request_availability: getRequestAvailabilityTimes(times),
        user_givenName: activeUserGivenName || 'Unknown',
        participant_givenName: participantGivenName || 'Unknown',
        invite_rate: invite.rate.toString(),
      },
    }

    logger.info(`Sending Service Invite
      ${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP2EmailSent,
      userId,
      properties: {
        to,
        providerServiceRequestId: invite.request.id,
        providerServiceInviteId: invite.id,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  public async sendServiceIntroductoryEmail(userId: string, invite: ProviderInviteWithRequestAndTimes) {
    const {
      participantPlanManagementCategory,
      participantAddress,
      participantDateOfBirth,
      activeUserGivenName,
      participantGivenName,
      times,
    } = invite.request

    const emailId = isProchoManaged(participantPlanManagementCategory)
      ? config.HUBSPOT_SERVICE_REQUEST_P2_5_PCM
      : config.HUBSPOT_SERVICE_REQUEST_P2_5_NPC

    const to = (process.env.RACK == 'production' ? invite.providerEmail : process.env.HUBSPOT_DEV_EMAIL) as string

    const message = {
      to,
    }

    const input: SendEmailInput = {
      emailId,
      message,
      contactProperties: {},
      customProperties: {
        request_id: invite.request.id,
        request_supportName: invite.request.supportName,
        request_description: invite.request.description,
        request_hoursPerWeek:
          hoursPerWeekOptions.find((option) => option.value === invite.request.hoursPerWeek)?.label ?? '',
        request_disabilities: invite.request.disabilities
          .map((d) => disabilityOptions.find((o) => o.value == d)?.label)
          .join(', '),
        request_otherIssues: invite.request.otherIssues.join(', '),
        participant_address: generateMaskedAddress(participantAddress || ''),
        request_travel: travelOptions.find((to) => to.value == invite.request.travel)?.label || '',
        participant_age: dayjs().diff(participantDateOfBirth, 'year').toString(),
        request_availability: getRequestAvailabilityTimes(times),
        user_givenName: activeUserGivenName || 'Unknown',
        participant_givenName: participantGivenName || 'Unknown',
        invite_rate: invite.rate.toString(),
      },
    }
    logger.info(`Sending Service Introductory Email ${JSON.stringify(input, null, 2)}`)

    const emailResponse = await this.sendEmail(input)

    analytics.track({
      event: ServiceRequestEmailSentEvents.ecommerceServiceRequestP25EmailSent,
      userId,
      properties: {
        to,
        providerServiceRequestId: invite.request.id,
        providerServiceInviteId: invite.id,
        hubspotResponse: JSON.stringify(emailResponse),
      },
    })

    return emailResponse
  }

  private redactBcc = (bcc?: string[]): string[] => {
    if (process.env.RACK == 'production' && bcc) {
      return bcc
    } else {
      return []
    }
  }
}

export const mailerService = new MailerService(createHubspotMailerClient())
