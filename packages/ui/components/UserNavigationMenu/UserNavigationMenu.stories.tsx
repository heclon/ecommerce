import { ComponentMeta } from '@storybook/react'
import * as React from 'react'
import { UserNavigationMenu, UserNavigationMenuItem } from './UserNavigationMenu'

export default {
  title: 'Components/User Navigation Menu',
  component: UserNavigationMenu,
} as ComponentMeta<typeof UserNavigationMenu>

export const ProviderMenu = () => (
  <UserNavigationMenu onLogoutClick={() => console.log('LoggedOut')}>
    <UserNavigationMenuItem href="/provider/account/profile" name="My Profile" />
  </UserNavigationMenu>
)
