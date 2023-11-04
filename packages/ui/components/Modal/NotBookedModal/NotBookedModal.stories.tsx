import React from 'react'
import { NotBookedModal, OfferDidNotGoAheadReason } from './index'
import { Meta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Modal/NotBookedModal',
  component: NotBookedModal,
} as Meta

const Default: ComponentStory<typeof NotBookedModal> = ({
  onClose,
  onSubmit,
  isOpen,
  location,
  clientName,
  supportName,
  offerDidNotGoAheadReason,
  reasonDescription,
}): JSX.Element => {
  return (
    <NotBookedModal
      isOpen={isOpen}
      location={location}
      clientName={clientName}
      supportName={supportName}
      onClose={onClose}
      onSubmit={onSubmit}
      offerDidNotGoAheadReason={offerDidNotGoAheadReason}
      reasonDescription={reasonDescription}
    />
  )
}

export const NotBookedStory = Default.bind({})
NotBookedStory.args = {
  isOpen: true,
  onSubmit: async () => console.log('Call the mutation, call analytics and return the promise'),
  onClose: (isOpen?: boolean) => console.log('Closing modal, isOpen = ', isOpen),
  offerDidNotGoAheadReason: OfferDidNotGoAheadReason.clientDidNotGoAheadWithService,
  reasonDescription: '',
  clientName: 'Demo client',
  supportName: 'Demo service',
  location: 'Demo location CBD',
}
