/* eslint-disable sonarjs/no-duplicate-string */

import { ComponentStory, Meta } from '@storybook/react'
import faker from 'faker/locale/en'
import React from 'react'
import { BookedModal } from './BookedModal'

faker.seed(1)

export default {
  title: 'Components/Modal/BookedModal',
  component: BookedModal,
} as Meta

const Default: ComponentStory<typeof BookedModal> = ({
  onClose,
  onClick,
  isOpen,
  supportName,
  clientName,
  location,
}): JSX.Element => {
  return (
    <BookedModal
      isOpen={isOpen}
      onClose={onClose}
      onClick={onClick}
      supportName={supportName}
      clientName={clientName}
      location={location}
    />
  )
}

export const BookedStory = Default.bind({})
BookedStory.args = {
  isOpen: true,
  onClick: async () => console.log('Call the mutation, call analytics and return the promise'),
  onClose: (_isOpen?: boolean) => console.log('Closing modal'),
  supportName: 'Your service here',
  clientName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  location: 'Surry Hills, NSW, Australia',
}
