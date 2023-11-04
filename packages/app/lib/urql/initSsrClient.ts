import { cacheExchange } from '@urql/exchange-graphcache'
import { errorExchange, dedupExchange, ssrExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { initUrqlClient, SSRExchange } from 'next-urql'
import { GetServerSidePropsContext } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { executeExchange } from '@urql/exchange-execute'
import { Client } from '@urql/core'
import getApiUrl from './getApiUrl'
import { createContext } from '../../server/context'
import schema from '../../server/schema'
import { trimInputsExchange } from '../exchanges/trimInputsExchange'
import uniqBy from 'lodash/uniqBy'

const initSsrClient: (ctx: GetServerSidePropsContext) => Promise<[Client | null, SSRExchange]> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx.req, ctx.res)
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: getApiUrl(), // not needed without `fetchExchange`
      exchanges: [
        devtoolsExchange,
        errorExchange({
          onError: (error) => {
            if (error.networkError) {
              console.error(`[HH-App: Network error]: ${error.message} ${error.stack}`)
            } else {
              const errors = uniqBy(error.graphQLErrors, (error) => error.message)
              errors.forEach((error) => {
                console.error(`[HH-App: GraphQL error]: Message: ${error.message}, Path: ${error.path}`)
              })
            }
          },
        }),
        trimInputsExchange,
        dedupExchange,
        cacheExchange(),
        ssrCache,
        executeExchange({
          schema,
          context: () => {
            return createContext({ session })
          },
        }),
      ],
    },
    false
  )
  return [client, ssrCache]
}

export default initSsrClient
