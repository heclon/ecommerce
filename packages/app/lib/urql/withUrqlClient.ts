import { withUrqlClient as withUrqlClientWrapper } from 'next-urql'
import getNextUrqlClientConfig from './getNextUrqlClientConfig'
import { NextPage } from 'next'

const withUrqlClient = <T>(component: NextPage<T>) => {
  return withUrqlClientWrapper(getNextUrqlClientConfig)(component)
}

export default withUrqlClient
