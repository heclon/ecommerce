import React from 'react'
import { FormikRecurrentBookingSelector } from './index'
import { Meta, ComponentStory } from '@storybook/react'
import formikDecorator from '../../.storybook/decorators/formikDecorator'
import { Formik, Form } from 'formik'
import { Button } from '../Button'

export default {
  title: 'Components/Formik/FormikRecurrentBookingSelector',
  component: FormikRecurrentBookingSelector,
  decorators: [formikDecorator],
} as Meta

const Default: ComponentStory<typeof FormikRecurrentBookingSelector> = ({
  frequency,
  customFrequency,
  frequencySelectorEnd,
  counter,
  whichDays,
  rrule,
  onSubmit,
}): JSX.Element => {
  console.log(onSubmit)
  return (
    <Formik
      initialValues={{
        frequency: frequency,
        startDate: new Date(),
        customFrequency: customFrequency,
        interval: 1,
        counter: counter,
        byMonthDay: '',
        bySetPos: '',
        byDay: '',
        frequencySelectorEnd: frequencySelectorEnd,
        endDate: '',
        whichDays: whichDays,
        rrule: rrule,
      }}
      onSubmit={async (values): Promise<void> => {
        if (onSubmit) {
          onSubmit(values)
        }
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values, errors }): JSX.Element => (
        <>
          <Form>
            <FormikRecurrentBookingSelector values={values} errors={errors} />
            <Button
              id="submit-button"
              data-testid="submit-button"
              variant="is-primary"
              outlined={false}
              type="submit"
              className="mt-5 inline-flex w-auto justify-center rounded bg-blue-700 text-white sm:col-start-3 sm:mt-4"
            >
              Submit
            </Button>
          </Form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  )
}
const submitActionsMessage = 'Call the mutation, call analytics and return the promise'
export const OneOffSession = Default.bind({})
OneOffSession.args = {
  frequency: 'OneOff',
  rrule: 'FREQ=DAILY;COUNT=1',
  onSubmit: async () => console.log(submitActionsMessage),
}

export const MonthlyNeverEnding = Default.bind({})
MonthlyNeverEnding.args = {
  frequency: 'Monthly',
  customFrequency: 'OnDay',
  frequencySelectorEnd: 'Never',
  rrule: 'FREQ=Monthly;INTERVAL=1',
  onSubmit: async () => console.log(submitActionsMessage),
}

export const MonthlyEndingOnDate = Default.bind({})
MonthlyEndingOnDate.args = {
  frequency: 'Monthly',
  customFrequency: 'OnThe',
  frequencySelectorEnd: 'OnDate',
  rrule: 'FREQ=Monthly;INTERVAL=1',
  onSubmit: async () => console.log(submitActionsMessage),
}

export const WeeklyOnMonAndFriEndingAfter3Appointments = Default.bind({})
WeeklyOnMonAndFriEndingAfter3Appointments.args = {
  frequency: 'Weekly',
  whichDays: ['MO', 'FR'],
  frequencySelectorEnd: 'After',
  counter: 3,
  rrule: 'FREQ=Weekly;INTERVAL=1;COUNTER=3',
  onSubmit: async () => console.log(submitActionsMessage),
}
