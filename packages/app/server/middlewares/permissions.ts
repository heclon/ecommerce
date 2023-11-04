import { allow, and, rule, shield } from 'graphql-shield'
import type { GraphQLContext } from '../context'
import UserEmailUnverifiedError from '../errors/UserEmailUnverified'
import {
  checkUserCanAccessRelationshipId,
  providerCanAccessOffer,
  userCanAccessProviderServiceInvite,
} from '@ecommerce/common/services/AuthService'

const rules = {
  isGuest: allow,

  isUser: rule({ cache: 'contextual' })((_, _args, { auth0Id }: GraphQLContext): boolean => {
    return !!auth0Id
  }),

  canAccessUserParticipantRelationshipId: rule()(async (_parent, args, ctx: GraphQLContext) => {
    await checkUserCanAccessRelationshipId(ctx.auth0Id!, args.where.id)
    return true
  }),

  hasVerifiedEmail: rule({ cache: 'contextual' })((_, _args, ctx: GraphQLContext) => {
    if (!ctx.emailVerified) {
      return new UserEmailUnverifiedError(ctx.auth0Email)
    }
    return true
  }),
  canAccessProviderServiceInvite: rule()(async (_, args, ctx: GraphQLContext) => {
    if (!ctx.auth0Email) return false
    return (await userCanAccessProviderServiceInvite(ctx.auth0Email, args.where.id)).authorized
  }),
  canAccessProviderServiceOffer: rule()(async (_, args, ctx: GraphQLContext) => {
    if (!ctx.auth0Email) return false
    return (await providerCanAccessOffer(ctx.auth0Email, args.where.id)).authorized
  }),
  canCreateProviderServiceBooking: rule()(async (_, args, ctx: GraphQLContext) => {
    if (!ctx.auth0Email) return false
    return (await providerCanAccessOffer(ctx.auth0Email, args.data.offer?.connect?.id)).authorized
  }),
}

export const permissions = shield(
  {
    Query: {
      providerProfile: rules.isGuest,
      provider_serviceInvite: and(rules.isUser, rules.canAccessProviderServiceInvite),
    },
    CreateOnePublicProviderServiceRequestResponse: rules.isGuest,
    ProviderProfile: rules.isGuest,
    AgeGroup: rules.isGuest,
    Disability: rules.isGuest,
    AppointmentType: rules.isGuest,
    TravelPreference: rules.isGuest,
    TeamSize: rules.isGuest,
    Location: rules.isGuest,
    Vocation: rules.isGuest,
    Mutation: {
      createOneUserParticipantRelationship: rules.isUser,
      createOnePublicProviderServiceRequest: rules.isGuest,
      updateOneUserParticipantRelationship: and(rules.isUser, rules.canAccessUserParticipantRelationshipId),
      deleteOneUserParticipantRelationship: and(rules.isUser, rules.canAccessUserParticipantRelationshipId),
      provider_createServiceBooking: and(rules.isUser, rules.hasVerifiedEmail, rules.canCreateProviderServiceBooking),
      provider_createServiceOffer: and(rules.isUser, rules.hasVerifiedEmail),
      provider_updateServiceOffer: and(rules.isUser, rules.hasVerifiedEmail, rules.canAccessProviderServiceOffer),
      provider_updateServiceInvite: and(rules.isUser, rules.hasVerifiedEmail, rules.canAccessProviderServiceInvite),
      acceptServiceOffer: and(rules.isUser, rules.hasVerifiedEmail),
      declineServiceOffer: and(rules.isUser, rules.hasVerifiedEmail),
      syncUserParticipantRelationships: and(rules.isUser, rules.hasVerifiedEmail),
      resendEmailVerificationLink: rules.isUser,
      updateParticipantPortalUserProfile: and(rules.isUser, rules.hasVerifiedEmail),
    },
    ProviderServiceRequest: and(rules.isUser, rules.hasVerifiedEmail),
    ProviderServiceInvite: and(rules.isUser, rules.hasVerifiedEmail),
  },
  {
    allowExternalErrors: true,
    fallbackRule: rules.isUser,
  }
)
