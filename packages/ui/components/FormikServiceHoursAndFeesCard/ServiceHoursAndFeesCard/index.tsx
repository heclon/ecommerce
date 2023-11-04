import React from 'react'
import { FormikErrors, FormikValues } from 'formik'
import RatesInputSection from './RatesInputSection'
import { weekdays, weekends } from '../../Modal/BookingModal/Days'
export interface ServiceHoursAndFeesProps<TV> {
  values: FormikValues
  errors?: FormikErrors<TV>
  hoursPerSession?: number
  weekdayRate?: number
  weekendRate?: number
  startDate?: Date
  frequency?: string
  customFrequency?: string
  byDay?: string
  whichDays?: string[]
}

export const FormikServiceHoursAndFeesCard = <TV extends object>({
  values,
}: ServiceHoursAndFeesProps<TV>): JSX.Element => {
  const { byDay, whichDays, customFrequency, frequency, startDate } = values

  // Day of the week that the booking starts on
  const startDay = weekdays[startDate?.getDay() - 1]

  // WEEKLY BOOKINGS
  const weekdayBooking = whichDays?.some((day: string) => weekdays.includes(day))
  const weekendBooking = whichDays?.some((day: string) => weekends.includes(day))
  const weeklyWeekdayBooking = frequency === 'Weekly' && weekdayBooking
  const weeklyWeekendBooking = frequency === 'Weekly' && weekendBooking

  // MONTHLY BOOKINGS
  const monthlyBookingOnDay = frequency === 'Monthly' && customFrequency === 'OnDay'
  const monthlyBookingByWeekday = weekdays.includes(byDay)
  const monthlyBookingByWeekend = weekends.includes(byDay)

  // ONE-OFF BOOKINGS
  const oneOffWeekdayBooking = frequency === 'OneOff' && startDay !== undefined
  const oneOffWeekendBooking = frequency === 'OneOff' && startDay === undefined

  if (frequency) {
    return (
      <RatesInputSection
        values={values}
        weeklyWeekdayBooking={weeklyWeekdayBooking}
        weeklyWeekendBooking={weeklyWeekendBooking}
        monthlyBookingOnDay={monthlyBookingOnDay}
        monthlyBookingByWeekday={monthlyBookingByWeekday}
        monthlyBookingByWeekend={monthlyBookingByWeekend}
        oneOffWeekdayBooking={oneOffWeekdayBooking}
        oneOffWeekendBooking={oneOffWeekendBooking}
      />
    )
  }
  return <></>
}
