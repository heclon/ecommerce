import faker from 'faker/locale/en'
import {
  checkUserCanAccessParticipantId,
  checkUserCanAccessRelationshipId,
  userCanAccessParticipantId,
  userCanAccessRelationshipId,
  userHasServiceOfferAcceptedByParticipant,
} from '../AuthService'
import { prisma, prochoPrisma } from '@ecommerce/common/prisma-client'
import userFactory from '@ecommerce/common/__test-utils__/factories/userFactory'
import { Participant, RelationshipType, User, UserParticipantRelationship } from '@prisma/client'
import escape from 'pg-escape'
import providerServiceRequestFactory from '@ecommerce/common/__test-utils__/prisma-factories/providerServiceRequestFactory'
import {
  providerServiceInviteFactory,
  providerServiceOfferFactory,
} from '@ecommerce/common/__test-utils__/prisma-factories'
import {
  ProviderServiceRequest,
  ProviderServiceInvite,
  ProviderServiceOffer,
  ProviderServiceOfferStatus,
} from '@prisma/prochoClient'

interface Relationship extends UserParticipantRelationship {
  participant: Participant
}

const createUserParticipantRelationship = async (
  auth0Id: string = faker.random.alphaNumeric(),
  ndisNumber: string = faker.random.alphaNumeric(),
  familyName: string = faker.name.lastName(),
  dateOfBirth: Date = faker.date.recent()
): Promise<Relationship> => {
  return (await prisma.userParticipantRelationship.create({
    data: {
      user: {
        connectOrCreate: {
          where: {
            auth0Id: auth0Id,
          },
          create: userFactory.build({ id: faker.datatype.string(20), auth0Id }),
        },
      },
      participant: {
        create: {
          givenName: faker.name.firstName(),
          familyName: familyName,
          dateOfBirth: dateOfBirth,
          ndisNumber: ndisNumber,
        },
      },
      type: RelationshipType.Nominee,
    },
    include: {
      participant: true,
      user: true,
    },
  })) as UserParticipantRelationship & {
    participant: Participant
    user: User
  }
}

describe('AuthService', () => {
  let relationship: Relationship | undefined
  beforeEach(async () => {
    faker.seed(1)
    jest.resetAllMocks()
  })
  afterEach(() => {
    relationship &&
      prisma.$executeRaw(`DELETE FROM "UserParticipantRelationship" WHERE id=${escape.literal(relationship.id)}`)
  })

  describe('userCanAccessParticipantId', () => {
    it('returns invalid response if there is no participant for the user', async () => {
      const auth0Id = faker.datatype.uuid()
      const participantId = faker.datatype.uuid()

      const authResponse = await userCanAccessParticipantId(auth0Id, participantId)
      expect(authResponse).toEqual({
        authorized: false,
        message: "The authenticated user doesn't own the participant.",
      })
    })
    it('returns valid response if there is a participant for this user and key', async () => {
      const auth0Id = faker.datatype.uuid()

      relationship = await createUserParticipantRelationship(auth0Id)
      const authResponse = await userCanAccessParticipantId(auth0Id, relationship.participant.id)
      expect(authResponse).toEqual({
        authorized: true,
      })
    })
  })

  describe('checkUserCanAccessParticipantId', () => {
    it('throws an error if there is no relationship with user', async () => {
      const userId = faker.datatype.uuid()
      const participantId = faker.datatype.uuid()

      await expect(checkUserCanAccessParticipantId(userId, participantId)).rejects.toThrow(
        "The authenticated user doesn't own the participant."
      )
    })
  })

  describe('userCanAccessRelationshipId', () => {
    it('returns invalid response if there is no relationship for the user', async () => {
      const auth0Id = faker.datatype.uuid()
      const relationshipId = faker.datatype.uuid()

      const authResponse = await userCanAccessRelationshipId(auth0Id, relationshipId)
      expect(authResponse).toEqual({
        authorized: false,
        message: "The authenticated user doesn't own the relationship.",
      })
    })
    it('returns valid response if there is a relationship for this user and key', async () => {
      const auth0Id = faker.datatype.uuid()

      relationship = await createUserParticipantRelationship(auth0Id)
      const authResponse = await userCanAccessRelationshipId(auth0Id, relationship.id)
      expect(authResponse).toEqual({
        authorized: true,
      })
    })
  })

  describe('checkUserCanAccessRelationshipId', () => {
    it('throws an error if there is no relationship with user', async () => {
      const userId = faker.datatype.uuid()
      const relationshipId = faker.datatype.uuid()

      await expect(checkUserCanAccessRelationshipId(userId, relationshipId)).rejects.toThrow(
        "The authenticated user doesn't own the relationship."
      )
    })
  })

  describe('userHasServiceOfferAcceptedByParticipant', () => {
    interface RequestDetails extends ProviderServiceRequest {
      invites: (ProviderServiceInvite & {
        offers: ProviderServiceOffer[]
      })[]
    }
    let request: RequestDetails
    const createRequest = async (offerStatus: ProviderServiceOfferStatus): Promise<RequestDetails> =>
      (await prochoPrisma.providerServiceRequest.create({
        data: {
          ...providerServiceRequestFactory.build({ id: faker.datatype.string(8) }),
          invites: {
            create: {
              ...providerServiceInviteFactory.build({ id: faker.datatype.string(8) }),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              providerServiceRequestId: undefined,
              offers: {
                create: {
                  ...providerServiceOfferFactory.build({
                    id: faker.datatype.string(8),
                    status: offerStatus,
                  }),
                  inviteId: undefined,
                },
              },
            },
          },
        },
        include: {
          invites: {
            include: {
              offers: true,
            },
          },
        },
      })) as RequestDetails

    beforeEach(() => {
      faker.seed(1)
    })
    afterEach(async () => {
      request && (await prochoPrisma.$executeRaw(`DELETE FROM "ProviderServiceRequest" WHERE "id"='${request.id}'`))
    })

    it('returns invalid response if the provider does not have any accepted invites', async () => {
      request = await createRequest(ProviderServiceOfferStatus.Accepted)
      const ndisNumber = request.ndisNumber!
      const userEmail = faker.internet.email()
      const response = await userHasServiceOfferAcceptedByParticipant(userEmail, ndisNumber)
      expect(response).toMatchInlineSnapshot(`
        Object {
          "authorized": false,
          "message": "This user does not have any offers accepted by the participant. Alfred.Macejkovic@hotmail.com 432221246",
        }
      `)
    })

    it('returns invalid response if the provider only has rejected invites', async () => {
      request = await createRequest(ProviderServiceOfferStatus.Rejected)
      const ndisNumber = request.ndisNumber!
      const userEmail = request.invites?.[0].providerEmail as string
      const response = await userHasServiceOfferAcceptedByParticipant(userEmail, ndisNumber)
      expect(response).toMatchInlineSnapshot(`
        Object {
          "authorized": false,
          "message": "This user does not have any offers accepted by the participant. Florence_Kovacek69@gmail.com 432221246",
        }
      `)
    })

    it('returns valid response if the provider has an accepted invite from the participant', async () => {
      request = await createRequest(ProviderServiceOfferStatus.Accepted)
      const ndisNumber = request.ndisNumber!
      const userEmail = request.invites?.[0].providerEmail as string
      const response = await userHasServiceOfferAcceptedByParticipant(userEmail, ndisNumber)
      expect(response).toMatchInlineSnapshot(`
        Object {
          "authorized": true,
        }
      `)
    })
  })
})
