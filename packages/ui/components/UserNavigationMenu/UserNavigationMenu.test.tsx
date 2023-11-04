/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { UserNavigationMenu, UserNavigationMenuItem } from './UserNavigationMenu'
import { screen, render, cleanup, fireEvent } from '@testing-library/react'

describe('UserNavigationMenu', () => {
  const onLogoutSpy = jest.fn()
  const itemName = 'My Profile'
  const itemHref = '/provider/account/profile'
  const ProviderMenu = (
    <UserNavigationMenu onLogoutClick={onLogoutSpy}>
      <UserNavigationMenuItem name={itemName} href={itemHref} />
    </UserNavigationMenu>
  )

  afterEach(() => cleanup())
  it('Renders nav items correctly', async () => {
    render(ProviderMenu)
    fireEvent.click(screen.getByTestId('user-menu-button'))
    const navItem = screen.getByText(itemName)
    expect(navItem).toBeDefined()
  })
  it('Fires logout handler when user clicks logout', () => {
    render(ProviderMenu)
    fireEvent.click(screen.getByTestId('user-menu-button'))
    fireEvent.click(screen.getByText('Log out'))
    expect(onLogoutSpy).toBeCalled()
  })
})
