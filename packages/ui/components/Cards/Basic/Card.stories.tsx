import React, { ReactElement } from 'react'
import { Card, CardProps } from './Card'

export default {
  title: 'Components/Cards/Basic',
  component: Card,
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
    variant: {
      type: 'select',
      options: ['is-primary', 'is-secondary'],
      defaultValue: 'is-primary',
    },
  },
}

export const Basic = (args: CardProps): ReactElement => <Card {...args}>Card</Card>
