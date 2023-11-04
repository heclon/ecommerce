import { ProviderServiceOfferStatus } from '@prisma/prochoClient'
import { prisma, prochoPrisma } from '@ecommerce/common/prisma-client'

export interface AuthResponse {
  authorized: boolean
  message?: string
}

interface AuthPayload {
  permissions: string[]
  auth0Id: string
}

const logAndThrowUnauthorisedError = (authResponse: AuthResponse): boolean => {
  if (!authResponse.authorized) {
    console.error(authResponse.message)
    throw new Error('Not Authorised!')
  }
  return authResponse.authorized
}
/**
 * Checks if the user is the participant / created the service request
 */
export const userCanAccessParticipantDetailsOnServiceRequest = async (
  userEmail: string,
  serviceRequestId: string
): Promise<AuthResponse> => {
  const serviceRequest = await prochoPrisma.providerServiceRequest.findUnique({
    where: { id: serviceRequestId },
  })
  if (serviceRequest?.activeUserEmail === userEmail || serviceRequest?.createdBy === userEmail) {
    return { authorized: true }
  }

  return {
    authorized: false,
    message: `${userEmail} cannot access the participant details on service request - ${serviceRequestId}`,
  }
}

/**
 * Checks if the participant has accepted at least one service offer from the user (provider)
 */
export const userHasServiceOfferAcceptedByParticipant = async (
  userEmail: string,
  ndisNumber: string
): Promise<AuthResponse> => {
  const exists = await prochoPrisma.providerServiceRequest.count({
    where: {
      ndisNumber,
      invites: {
        some: {
          providerEmail: {
            equals: userEmail,
            mode: 'insensitive',
          },
          offers: {
            some: {
              status: ProviderServiceOfferStatus.Accepted,
            },
          },
        },
      },
    },
  })

  if (exists) {
    return {
      authorized: true,
    }
  }

  return {
    authorized: false,
    message: `This user does not have any offers accepted by the participant. ${userEmail} ${ndisNumber}`,
  }
}

export const checkUserHasPermission = (authPayload: AuthPayload, requiredPermission: string): boolean => {
  return logAndThrowUnauthorisedError(userHasPermission(authPayload, requiredPermission))
}

export const userHasPermission = ({ auth0Id, permissions }: AuthPayload, requiredPermission: string): AuthResponse => {
  if (auth0Id.startsWith('anon|')) {
    return {
      authorized: false,
      message: 'Anonymous users permissions cannot be trusted.',
    }
  }
  if (!permissions?.includes(requiredPermission)) {
    return {
      authorized: false,
      message: `User does not have required permission. ${requiredPermission}`,
    }
  }
  return {
    authorized: true,
  }
}

/**
 * Checks if the user can access provider service invite
 * Additionally throw unauthorised error if not authorised
 */
export const checkUserCanAccessProviderServiceInvite = async (
  userEmail: string,
  inviteId: string
): Promise<boolean> => {
  return logAndThrowUnauthorisedError(await userCanAccessProviderServiceInvite(userEmail, inviteId))
}

/**
 * Checks if the user can access the provider service invite
 */
export const userCanAccessProviderServiceInvite = async (
  userEmail: string,
  inviteId: string
): Promise<AuthResponse> => {
  const invite = await prochoPrisma.providerServiceInvite.findUnique({
    where: {
      id: inviteId,
    },
  })

  if (invite?.providerEmail?.toLowerCase() !== userEmail.toLowerCase()) {
    return {
      authorized: false,
      message: `Provider email (${userEmail}) does not match invite email (${invite?.providerEmail}).`,
    }
  }
  return {
    authorized: true,
  }
}

export const userCanAccessRelationshipId = async (
  auth0Id: string,
  relationshipId?: string | null
): Promise<AuthResponse> => {
  const exists =
    !!relationshipId &&
    (await prisma.userParticipantRelationship.count({
      where: {
        user: {
          auth0Id,
        },
        id: relationshipId,
      },
    })) > 0
  if (!exists) {
    return { authorized: false, message: "The authenticated user doesn't own the relationship." }
  }
  return { authorized: true }
}

export const checkUserCanAccessRelationshipId = async (
  auth0Id: string,
  relationshipId?: string | null
): Promise<boolean> => {
  return throwOnFailedAuthResponse(await userCanAccessRelationshipId(auth0Id, relationshipId))
}

export const userCanAccessParticipantId = async (
  auth0Id: string,
  participantId?: string | null
): Promise<AuthResponse> => {
  const exists =
    !!participantId &&
    (await prisma.userParticipantRelationship.count({
      where: {
        user: {
          auth0Id,
        },
        participant: {
          id: participantId,
        },
      },
    })) > 0
  if (!exists) {
    return { authorized: false, message: "The authenticated user doesn't own the participant." }
  }
  return { authorized: true }
}

export const checkUserCanAccessParticipantId = async (
  auth0Id: string,
  participantId?: string | null
): Promise<boolean> => {
  return throwOnFailedAuthResponse(await userCanAccessParticipantId(auth0Id, participantId))
}

export const userCanAccessOfferId = async (activeEmail: string, offerId: string): Promise<AuthResponse> => {
  const exists =
    (await prochoPrisma.providerServiceOffer.count({
      where: {
        id: offerId,
        invite: { request: { activeUserEmail: activeEmail } },
      },
    })) > 0
  if (exists) {
    return { authorized: true }
  }
  return { authorized: false, message: 'The authenticated user cannot access this offer.' }
}

export const providerCanAccessOffer = async (activeEmail: string, offerId: string): Promise<AuthResponse> => {
  const offer = await prochoPrisma.providerServiceOffer.findFirst({
    where: {
      id: offerId,
    },
  })
  if (!offer) {
    return { authorized: false, message: `No offer for ${offerId} could be found.` }
  }
  return userCanAccessProviderServiceInvite(activeEmail, offer.inviteId)
}

export const checkUserCanUpdateServiceRequestOffer = async (activeEmail: string, offerId: string): Promise<boolean> => {
  return throwOnFailedAuthResponse(await userCanAccessOfferId(activeEmail, offerId))
}

const throwOnFailedAuthResponse = (authResponse: AuthResponse): boolean => {
  if (!authResponse.authorized) {
    throw new Error(authResponse.message || 'Forbidden')
  }
  return authResponse.authorized
}
