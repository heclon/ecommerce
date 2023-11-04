import React from 'react'
import { FormikCheckboxButton } from './FormikCheckboxButton'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Formik, Form } from 'formik'
import { Label } from '../Label'

export default {
  title: 'Components/Formik/FormikCheckboxButton',
  component: FormikCheckboxButton,
} as ComponentMeta<typeof FormikCheckboxButton>

const days = [
  { label: 'Mon', value: 'Monday' },
  { label: 'Tue', value: 'Tuesday' },
  { label: 'Wed', value: 'Wednesday' },
  { label: 'Thu', value: 'Thursday' },
  { label: 'Fri', value: 'Friday' },
  { label: 'Sat', value: 'Saturday' },
  { label: 'Sun', value: 'Sunday' },
]

const Template: ComponentStory<typeof FormikCheckboxButton> = ({ id }) => {
  return (
    <Formik
      initialValues={{
        whichDays: [],
      }}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 200)
      }}
    >
      {({ values }) => {
        return (
          <>
            <Form>
              <Label className="m-2 text-gray-300">Which days this changed</Label>
              {days.map((day, index) => {
                return (
                  <FormikCheckboxButton
                    arrayName="whichDays"
                    id={id + index}
                    name={day.value}
                    label={day.label}
                    key={index}
                    wrapperClassName="flex h-10 w-auto rounded-md bg-blue-300 m-2"
                    buttonClassName="flex-1 rounded-md bg-blue-300"
                    checkedClassName="text-blue-yourbrand border-blue-yourbrand bg-blue-300"
                    uncheckedClassName="bg-white"
                  />
                )
              })}
            </Form>
            <p className="mt-8 text-lg font-semibold">Form Values</p>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </>
        )
      }}
    </Formik>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  id: 'dayCheckBox',
}
