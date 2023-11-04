import React, { FC } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Modal } from '../Modal'
import { Dialog } from '@headlessui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import { ServiceRequestInfoLabel } from '../../ServiceRequestInfoLabel'
import { FormikServiceHoursAndFeesCard } from '../../FormikServiceHoursAndFeesCard'
import { FormikRecurrentBookingSelector } from '../../FormikRecurrentBookingSelector'
import { Buttons } from './Buttons'

import { validationSchema } from './ValidationSchema'
export interface BookingsModalProps {
  isOpen: boolean
  onClose: (isOpen?: boolean) => void
  submitBooking: (values: FormikValues) => Promise<void>
  supportName: string
  clientName: string
  location: string | undefined | null
  startDate?: Date
  endDate?: Date
  frequency?: string | undefined
  customFrequency?: string
  whichDays?: string[]
  frequencySelectorEnd?: string
  interval?: number
  counter?: number
  byMonthDay?: string
  byDayPos?: string
  byDay?: string
  hoursPerSession?: number
  weekdayRate?: number
  weekendRate?: number
  rrule?: string
}

export interface BookingFormValues {
  rrule: string | undefined
  frequency: string | undefined
  startDate?: Date
  endDate?: Date
  dtstart?: string
  dtend?: string
  customFrequency?: string
  whichDays?: string[]
  frequencySelectorEnd?: string
  interval?: number
  counter?: number
  byMonthDay?: string
  byDayPos?: string
  byDay?: string
  hoursPerSession?: number
  weekdayRate?: number
  weekendRate?: number
}

export const BookingModal: FC<BookingsModalProps> = ({
  isOpen,
  onClose: onCloseOriginal,
  submitBooking,
  supportName,
  clientName,
  location,
  startDate = new Date(),
  endDate,
  frequency,
  customFrequency,
  rrule,
  whichDays,
  frequencySelectorEnd = 'Never',
  interval = 1,
  counter,
  byMonthDay,
  byDayPos,
  byDay,
  hoursPerSession = 1,
  weekdayRate = 0,
  weekendRate = 0,
}) => {
  const onClose = async () => {
    onCloseOriginal(false)
  }
  const initialValues: BookingFormValues = {
    frequency: frequency,
    startDate: startDate,
    customFrequency: customFrequency,
    whichDays: whichDays,
    interval: interval,
    counter: counter,
    byMonthDay: byMonthDay,
    byDayPos: byDayPos,
    byDay: byDay,
    frequencySelectorEnd: frequencySelectorEnd,
    endDate: endDate,
    rrule: rrule,
    hoursPerSession: hoursPerSession,
    weekdayRate: weekdayRate,
    weekendRate: weekendRate,
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
        <Dialog.Title as="h3" className="mb-4 text-xl font-medium leading-6">
          Booking details
          <XIcon className="float-right h-5 w-5 cursor-pointer text-gray-400 opacity-60" onClick={onClose} />
        </Dialog.Title>
        <div className="mt-2">
          <p className="font-light leading-6">
            Adding booking details here will allow us to better support you with providing your clients with the
            best ongoing experience.
          </p>
        </div>
        <div>
          <ServiceRequestInfoLabel supportName={supportName} clientName={clientName} location={location} />
        </div>
        <Formik
          enableReinitialize
          onSubmit={async (values) => {
            await submitBooking(values)
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors }: FormikProps<BookingFormValues>): React.ReactNode => {
            return (
              <Form>
                <FormikRecurrentBookingSelector values={values} errors={errors} />
                <FormikServiceHoursAndFeesCard values={values} errors={errors} />
                <Buttons onClose={onClose} errors={errors} />
              </Form>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}
