import React, { ReactElement, useEffect, useState } from 'react'
import { FormikHighlightedRadioButtons } from './FormikHighlightedRadioButtons'
import { Formik, Form } from 'formik'
import { FormikSelectInput } from '../FormikSelectInput'
import { dayOfMonth } from '../common/dayOfMonth'
import { dayOfWeekInMonth } from '../common/dayOfWeekInMonth'
import { frequencySelectorDayOptions } from '../common/frequencySelectorDayOptions'
import dayjs from 'dayjs'
import { ReactSelectOptions } from '../ReactSelect'

export default {
  title: 'Components/Formik/FormikHighlightedRadioButtons',
  component: FormikHighlightedRadioButtons,
  argTypes: {
    placeholder: {
      type: 'string',
      defaultValue: 'Search for an address',
    },
  },
}

export const Primary = (): ReactElement => {
  const [daysOptions, setDaysOptions] = useState<ReactSelectOptions[]>([])
  useEffect(() => {
    const check = dayjs(new Date(), 'DD/MM/YYYY')
    const month = check.month() + 1
    const year = check.year()
    setDaysOptions(dayOfMonth(year, month))
  }, [])
  return (
    <Formik
      initialValues={{
        customFrequency: '',
        bySetPos: '',
        byDay: '',
        byMonthDay: '',
      }}
      validate={(values) => {
        const errors = {
          customFrequency: '',
          bySetPos: '',
          byDay: '',
          byMonthDay: '',
        }
        if (!values.byMonthDay) {
          errors.byMonthDay = 'Please pick a day'
        }
        if (!values.bySetPos) {
          errors.bySetPos = 'Please pick a day'
        }
        if (!values.byDay) {
          errors.byDay = 'Please select the day of the week'
        }
        return errors
      }}
      onSubmit={(values): void => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values, errors }): JSX.Element => (
        <>
          <Form>
            <FormikHighlightedRadioButtons
              disabled={false}
              name="customFrequency"
              values={values}
              item={{ id: 'OnDay', name: 'On day' }}
            >
              <FormikSelectInput
                id="byMonthDay"
                name="byMonthDay"
                options={daysOptions}
                placeholder="Select day"
                className="pl-20"
                errors={errors}
              />
            </FormikHighlightedRadioButtons>
            <FormikHighlightedRadioButtons
              disabled={false}
              name="customFrequency"
              values={values}
              item={{ id: 'OnThe', name: 'On the' }}
            >
              <FormikSelectInput
                id="bySetPos"
                name="bySetPos"
                options={dayOfWeekInMonth}
                placeholder="Select day"
                errors={errors}
              />
              <FormikSelectInput
                id="byDay"
                name="byDay"
                options={frequencySelectorDayOptions}
                placeholder="Select day"
                errors={errors}
              />
            </FormikHighlightedRadioButtons>
          </Form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  )
}
