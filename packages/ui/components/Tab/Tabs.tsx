import { Tab } from '@headlessui/react'
import * as React from 'react'

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TabButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export type TabPanelProps = TabListProps
export type TabGroupProps = TabListProps

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const TabGroup = ({ ...props }): JSX.Element => {
  return <Tab.Group {...props}>{props.children}</Tab.Group>
}

export const TabList = ({ children, ...props }: TabListProps): JSX.Element => {
  return (
    <Tab.List
      className="focus:border-blue-primary focus:ring-blue-primary flex w-full justify-between rounded-md border-b border-gray-200 text-base focus:outline-none sm:pr-10 sm:text-sm md:block"
      {...props}
    >
      {children}
    </Tab.List>
  )
}

export const TabButton = ({ children, ...props }: TabButtonProps): JSX.Element => {
  return (
    <Tab
      as="button"
      className={({ selected }) =>
        classNames(
          selected
            ? 'border-blue-primary text-blue-primary'
            : 'border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300',
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium w-full sm:w-44 focus:outline-none'
        )
      }
      {...props}
    >
      {children}
    </Tab>
  )
}

export const TabPanel = ({ children, ...props }: TabPanelProps): JSX.Element => {
  return <Tab.Panel {...props}>{children}</Tab.Panel>
}
