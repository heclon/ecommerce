import { trimInputsExchange } from '../exchanges/trimInputsExchange'
import getApiUrl from './getApiUrl'
import { NextUrqlClientConfig } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { errorExchange, dedupExchange } from 'urql'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { cacheExchange } from '@urql/exchange-graphcache'
import uniqBy from 'lodash/uniqBy'
import { toast } from 'react-hot-toast'

const getNextUrqlClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
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

        if (error.message.includes('User email not verified')) {
          return toast.error('Please verify your email.')
        }

        toast.error(
          `Error occurred, our team has been notified and is looking into it. \nSomething urgent? \nPlease contact us on providers@ecommerce.com.au`
        )
      },
    }),
    trimInputsExchange,
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
