import { cacheExchange } from '@urql/exchange-graphcache'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { dedupExchange, errorExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { NextUrqlClientConfig } from 'next-urql'
import getApiUrl from './getApiUrl'
import uniqBy from 'lodash/uniqBy'
import toast from 'react-hot-toast'

export const getNextUrqlClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  exchanges: [
    devtoolsExchange,
    errorExchange({
      onError: (error) => {
        if (error.networkError) {
          console.error(`[HH-Admin: Network error]: ${error.message} ${error.stack}`)
        } else {
          const errors = uniqBy(error.graphQLErrors, (error) => error.message)
          errors.forEach((error) => {
            console.error(`[HH-Admin: GraphQL error]: Message: ${error.message}, Path: ${error.path}`)
          })
        }
        toast.error(
          `Error occurred, our team has been notified and is looking into it. \nSomething urgent? \nPlease contact the engineering team
    in the #tech-issues Slack channel`
        )
      },
    }),
    dedupExchange,
    cacheExchange(),
    ssrExchange,
    multipartFetchExchange,
  ],
  fetchOptions: {
    credentials: 'include',
  },
  requestPolicy: `cache-and-network`,
  url: getApiUrl(),
})

export default getNextUrqlClientConfig
