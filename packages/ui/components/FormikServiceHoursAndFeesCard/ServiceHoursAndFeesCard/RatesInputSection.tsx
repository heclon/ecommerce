import React from 'react'
import { FormikValues } from 'formik'
import WeekdayRateInput from './WeekdayRateInput'
import WeekendRateInput from './WeekendRateInput'
interface RatesInputsSectionProps {
  values: FormikValues
  weeklyWeekdayBooking: boolean
  weeklyWeekendBooking: boolean
  monthlyBookingOnDay: boolean
  monthlyBookingByWeekday: boolean
  monthlyBookingByWeekend: boolean
  oneOffWeekdayBooking: boolean
  oneOffWeekendBooking: boolean
}

const RatesInputSection = ({
  values,
  weeklyWeekdayBooking,
  weeklyWeekendBooking,
  monthlyBookingOnDay,
  monthlyBookingByWeekday,
  monthlyBookingByWeekend,
  oneOffWeekdayBooking,
  oneOffWeekendBooking,
}: RatesInputsSectionProps) => {
  return (
    <>
      <hr className="mt-8 mb-4" />
      <div className="relative grid grid-cols-2 gap-2">
        {weeklyWeekdayBooking && <WeekdayRateInput values={values} />}
        {weeklyWeekendBooking && <WeekendRateInput values={values} />}

        {monthlyBookingOnDay && (
          <>
            <WeekdayRateInput values={values} />
            <WeekendRateInput values={values} />
          </>
        )}

        {monthlyBookingByWeekday && <WeekdayRateInput values={values} />}
        {monthlyBookingByWeekend && <WeekendRateInput values={values} />}

        {oneOffWeekdayBooking && <WeekdayRateInput values={values} />}
        {oneOffWeekendBooking && <WeekendRateInput values={values} />}
      </div>
    </>
  )
}

export default RatesInputSection
