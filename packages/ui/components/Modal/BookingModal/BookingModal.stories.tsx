import React from 'react'
import { BookingModal } from './index'
import { Meta, ComponentStory } from '@storybook/react'
import faker from 'faker/locale/en'
import fakeDate from '@ecommerce/common/__test-utils__/testing-library/fakeDate'
faker.seed(1)

export default {
  title: 'Components/Modal/BookingModal',
  component: BookingModal,
  parameters: {
    date: new Date('2023-01-16'),
  },
} as Meta

const Default: ComponentStory<typeof BookingModal> = ({
  onClose,
  location,
  clientName,
  supportName,
  submitBooking,
  isOpen,
  frequency,
  startDate,
  customFrequency,
  frequencySelectorEnd,
  interval,
  counter,
  byMonthDay,
  byDayPos,
  byDay,
  whichDays,
  hoursPerSession,
  weekdayRate,
  weekendRate,
}): JSX.Element => {
  return (
    <BookingModal
      isOpen={isOpen}
      location={location}
      clientName={clientName}
      supportName={supportName}
      onClose={onClose}
      submitBooking={submitBooking}
      startDate={startDate}
      frequency={frequency}
      customFrequency={customFrequency}
      frequencySelectorEnd={frequencySelectorEnd}
      interval={interval}
      counter={counter}
      byMonthDay={byMonthDay}
      byDayPos={byDayPos}
      byDay={byDay}
      hoursPerSession={hoursPerSession}
      weekdayRate={weekdayRate}
      weekendRate={weekendRate}
      whichDays={whichDays}
    />
  )
}

const democlient = 'Demo client'
const demoService = 'Demo service'
const demoLocation = 'Demo location CBD'
const submitBookingText = 'Call the mutation, call analytics and return the promise'
const onCloseText = 'Closing modal, isOpen = '

export const BookingStory = Default.bind({})
BookingStory.args = {
  isOpen: true,
  submitBooking: async (values) => console.log(submitBookingText, values),
  onClose: (isOpen?: boolean) => console.log(onCloseText, isOpen),
  clientName: democlient,
  supportName: demoService,
  location: demoLocation,
}

export const BookingsStoryOneOffSession = Default.bind({})
BookingsStoryOneOffSession.args = {
  isOpen: true,
  submitBooking: async () => console.log(submitBookingText),
  onClose: (isOpen?: boolean) => console.log(onCloseText, isOpen),
  clientName: democlient,
  supportName: demoService,
  location: demoLocation,
  frequency: 'OneOff',
  rrule: 'FREQ=DAILY;COUNT=1',
  startDate: fakeDate(),
  hoursPerSession: 4,
  weekdayRate: 50,
  weekendRate: 75,
}

export const BookingsStoryMonthlyNeverEnding = Default.bind({})
BookingsStoryMonthlyNeverEnding.args = {
  isOpen: true,
  submitBooking: async () => console.log(submitBookingText),
  onClose: (isOpen?: boolean) => console.log(onCloseText, isOpen),
  clientName: democlient,
  supportName: demoService,
  location: demoLocation,
  frequency: 'Monthly',
  customFrequency: 'OnDay',
  interval: 1,
  frequencySelectorEnd: 'Never',
  byMonthDay: '7',
  rrule: 'FREQ=Monthly;INTERVAL=1',
  startDate: fakeDate(),
  hoursPerSession: 4,
  weekdayRate: 50,
  weekendRate: 75,
}

export const BookingsStoryWeeklyOnMonAndFriEndingAfter3Appointments = Default.bind({})
BookingsStoryWeeklyOnMonAndFriEndingAfter3Appointments.args = {
  isOpen: true,
  submitBooking: async () => console.log(submitBookingText),
  onClose: (isOpen?: boolean) => console.log(onCloseText, isOpen),
  clientName: democlient,
  supportName: demoService,
  location: demoLocation,
  frequency: 'Weekly',
  whichDays: ['MO', 'FR'],
  frequencySelectorEnd: 'After',
  interval: 1,
  counter: 3,
  rrule: 'FREQ=Weekly;INTERVAL=1;COUNTER=3',
  startDate: fakeDate(),
  hoursPerSession: 4,
  weekdayRate: 50,
  weekendRate: 75,
}
