import { rule, shield } from 'graphql-shield'
import type { GraphQLContext } from '../context'

const rules = {
  isAdmin: rule()(async (_parent, _args, { auth0Id }: GraphQLContext): Promise<boolean> => {
    return !!auth0Id
  }),
}

export const permissions = shield(
  {
    Query: rules.isAdmin,
    Mutation: rules.isAdmin,
  },
  { allowExternalErrors: true }
)
