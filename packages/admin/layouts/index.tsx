import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { BookOpenIcon, CalendarIcon, HomeIcon, MenuIcon, UsersIcon, XIcon } from '@heroicons/react/outline'
import { Dialog, Logo, Transition } from '@ecommerce/ui'
import Avatar from 'boring-avatars'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Service invites', href: '/service-invites', icon: CalendarIcon },
  { name: 'Service requests', href: '/service-requests', icon: BookOpenIcon },
]

interface Props {
  children: React.ReactNode
  user: UserProfile
}

function Layout({ children, user }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 z-40 flex md:hidden"
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex shrink-0 items-center px-4">
                    <Logo className="h-6 w-auto" />
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          {
                            'bg-gray-100 text-gray-900': router.pathname === item.href,
                            'text-gray-600 hover:bg-gray-100 hover:text-gray-900': router.pathname !== item.href,
                          },
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            {
                              'text-gray-600': router.pathname === item.href,
                              'text-gray-400 group-hover:text-gray-600': router.pathname !== item.href,
                            },
                            'shrink-0 mr-4 w-6 h-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex shrink-0 border-t border-gray-200 p-4">
                  <div className="group block shrink-0">
                    <div className="flex items-center">
                      <div>
                        <Avatar
                          size={32}
                          name={`${user.nickname}`}
                          variant="marble"
                          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.nickname}</p>
                        <Link href="/api/auth/logout" passHref>
                          <p className="text-xs font-medium text-gray-600 group-hover:text-gray-700">Logout</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex h-0 flex-1 flex-col border-r border-gray-200 bg-white">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex shrink-0 items-center px-4">
                  <Logo className="h-6 w-auto" />
                </div>
                <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} passHref>
                      <p
                        className={classNames(
                          {
                            'bg-gray-100 text-gray-900': router.pathname === item.href,
                            'text-gray-600 hover:bg-gray-100 hover:text-gray-900': router.pathname !== item.href,
                          },
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            {
                              'text-gray-600': router.pathname === item.href,
                              'text-gray-400 group-hover:text-gray-600': router.pathname !== item.href,
                            },
                            'shrink-0 mr-3 w-6 h-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex shrink-0 border-t border-gray-200 p-4">
                <div className="group block w-full shrink-0">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        size={32}
                        name={`${user.name}`}
                        variant="marble"
                        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                      <Link href="/api/auth/logout" passHref>
                        <p className="text-xs font-medium text-gray-600 group-hover:text-gray-700">Logout</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-0 flex-1 flex-col overflow-hidden bg-gray-100">
          <div className="pt-1 pl-1 sm:pt-3 sm:pl-3 md:hidden">
            <button
              type="button"
              className="focus:ring-purple-heart-500 -mt-0.5 -ml-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default withPageAuthRequired(Layout)
