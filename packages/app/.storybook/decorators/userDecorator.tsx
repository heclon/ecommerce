import { makeDecorator } from '@storybook/addons'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import userProfileFactory from '@ecommerce/common/__test-utils__/factories/userProfileFactory'

export default makeDecorator({
  name: 'userDecorator',
  parameterName: 'userDecorator',
  wrapper: (storyFn, context, { parameters }) => {
    const user = parameters?.user || userProfileFactory.build()
    return <UserProvider user={user}>{storyFn(context)}</UserProvider>
  },
})
