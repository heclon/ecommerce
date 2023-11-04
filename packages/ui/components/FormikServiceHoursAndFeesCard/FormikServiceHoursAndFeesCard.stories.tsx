import React, { ReactElement } from 'react'
import { ComponentStory, Meta } from '@storybook/react'
import { FormikServiceHoursAndFeesCard } from './ServiceHoursAndFeesCard'
import { Formik, Form, FormikValues, getIn } from 'formik'
import { Button } from '../Button'
import { validationSchema } from '../Modal/BookingModal/ValidationSchema'
export default {
  title: 'Components/Formik/FormikServiceHoursAndFeesCard',
  component: FormikServiceHoursAndFeesCard,
} as Meta

const onSubmit = (values: FormikValues) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
  }, 200)
}

const Default: ComponentStory<typeof FormikServiceHoursAndFeesCard> = ({
  hoursPerSession,
  weekdayRate,
  weekendRate,
  frequency,
  customFrequency,
  whichDays,
  byDay,
}): ReactElement => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        hoursPerSession: hoursPerSession,
        weekdayRate: weekdayRate,
        weekendRate: weekendRate,
        frequency: frequency,
        customFrequency: customFrequency,
        whichDays: whichDays,
        byDay: byDay,
      }}
      onSubmit={(values): void => {
        onSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors }): JSX.Element => {
        const hoursError = getIn(errors, 'hoursPerSession')
        console.log(values)
        return (
          <>
            <Form>
              <FormikServiceHoursAndFeesCard values={values} errors={errors} />
              <p className="my-4 ml-1 text-xs font-semibold text-red-600">{hoursError}</p>
              <Button variant="is-primary" type="submit">
                Submit
              </Button>
            </Form>
            <p className="mt-8 text-lg font-semibold">Form Values</p>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <p className="mt-8 text-lg font-semibold">Form Errors</p>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </>
        )
      }}
    </Formik>
  )
}

export const ValidWeekdayHoursRates = Default.bind({})
ValidWeekdayHoursRates.args = {
  weekdayRate: 55,
  frequency: 'Weekly',
  whichDays: ['MO'],
}
export const ValidWeekendHoursRates = Default.bind({})
ValidWeekendHoursRates.args = {
  weekendRate: 155,
  frequency: 'Weekly',
  whichDays: ['SA'],
}
export const ValidReoccurringMonthlyOnDayHoursRates = Default.bind({})
ValidReoccurringMonthlyOnDayHoursRates.args = {
  weekendRate: 155,
  weekdayRate: 55,
  customFrequency: 'OnDay',
  frequency: 'Monthly',
}
export const ValidReoccurringWeekdayMonthlyHoursRates = Default.bind({})
ValidReoccurringWeekdayMonthlyHoursRates.args = {
  weekendRate: 155,
  weekdayRate: 55,
  customFrequency: 'OnThe',
  frequency: 'Monthly',
  byDay: 'MO',
}
export const ValidReoccurringWeekendMonthlyHoursRates = Default.bind({})
ValidReoccurringWeekendMonthlyHoursRates.args = {
  weekendRate: 155,
  weekdayRate: 55,
  customFrequency: 'OnThe',
  frequency: 'Monthly',
  byDay: 'SA',
}

export const InvalidHours = Default.bind({})
InvalidHours.args = {
  customFrequency: 'OnDay',
  frequency: 'Monthly',
}

export const InvalidFees = Default.bind({})
InvalidFees.args = {
  hoursPerSession: 3,
  weekdayRate: 0,
  weekendRate: 0,
}
