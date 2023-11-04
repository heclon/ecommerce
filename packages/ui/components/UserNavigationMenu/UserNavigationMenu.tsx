import { Menu, Transition } from '@headlessui/react'
import Avatar from 'boring-avatars'
import classNames from 'classnames'
import Link from 'next/link'
import React, { Fragment, memo } from 'react'

export interface UserNavigationMenuProps {
  userEmail?: string | null
  children: React.ReactNode
  onLogoutClick: () => void
}

export interface UserNavigationMenuItemProps {
  name: string
  href: string
  onClick?: () => void
}

export const UserNavigationMenuItem = ({ name, href, onClick }: UserNavigationMenuItemProps) => {
  return (
    <Menu.Item key={name}>
      {({ active }) => (
        <Link href={href} passHref>
          <p
            className={classNames(
              {
                'bg-gray-100': active,
              },
              'block px-4 py-2 text-gray-700 text-sm'
            )}
            onClick={onClick}
          >
            {name}
          </p>
        </Link>
      )}
    </Menu.Item>
  )
}

export const UserNavigationMenu = memo(({ userEmail, children, onLogoutClick }: UserNavigationMenuProps) => {
  return (
    <div className="flex flex-1 justify-between px-4 sm:px-6">
      <div className="flex flex-1"></div>
      <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
        <Menu as="div" className="relative shrink-0">
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className="focus:ring-blue-yourbrand-500 flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  data-testid="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    size={36}
                    name={userEmail ?? ''}
                    variant="marble"
                    colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {children}
                  <Menu.Item>
                    <button
                      type="button"
                      onClick={onLogoutClick}
                      className="block w-full py-2 px-4 text-left text-sm text-gray-700"
                      data-testid="logout-button"
                    >
                      Log out
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
})
