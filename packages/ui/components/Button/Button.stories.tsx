import React, { ReactElement } from 'react'
import { Button, ButtonProps } from './Button'
import { MailIcon, PlusIcon } from '@heroicons/react/solid'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      type: 'select',
      options: ['is-tiny', 'is-small', 'is-normal', 'is-medium', 'is-large'],
      defaultValue: 'is-normal',
    },
    outlined: {
      type: 'boolean',
      defaultValue: false,
    },
    rounded: {
      type: 'boolean',
      defaultValue: false,
    },
    icon: {
      type: 'boolean',
      defaultValue: false,
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    variant: {
      type: 'select',
      options: ['is-primary', 'is-secondary'],
      defaultValue: 'is-primary',
    },
  },
}

export const Primary = (args: ButtonProps): ReactElement => <Button {...args}>Button</Button>

export const WithIcon = (args: ButtonProps): ReactElement => (
  <Button {...args}>
    Button
    <MailIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
  </Button>
)

export const WithIconLeft = (args: ButtonProps): ReactElement => (
  <Button {...args}>
    <MailIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
    Button
  </Button>
)

export const IconOnly = (args: ButtonProps): ReactElement => (
  <Button aria-label="Icon" {...args}>
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)
