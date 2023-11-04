import React, { ReactElement } from 'react'
import { FormikRadioButtons, RadioButtonProps } from './FormikRadioButtons'
import { Formik, Form } from 'formik'
export default {
  title: 'Components/Formik/FormikRadioButtons',
  component: FormikRadioButtons,
  argTypes: {
    placeholder: {
      type: 'string',
      defaultValue: 'Search for an address',
    },
  },
}

const mockoptions: RadioButtonProps['options'] = [
  { value: 'cl4dnjb2u0070o3r5wcj852po', label: 'No' },
  { value: 'cl4dnjb2u0072o3r536hrtpx2', label: 'Yes, up to 15 minutes' },
  { value: 'cl4dnjb2u0074o3r5btu75gfz', label: 'Yes, up to 30 minutes' },
  { value: 'cl4dnjb2u0076o3r5mg6si8or', label: 'Yes, up to 60 minutes' },
]

export const Secondary = (): ReactElement => {
  return (
    <Formik
      initialValues={{
        test: '',
      }}
      onSubmit={(values): void => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values, errors }): JSX.Element => (
        <Form>
          <FormikRadioButtons errors={errors} disabled={false} name="test" options={mockoptions} />
          <button type="submit">Submit</button>
          {JSON.stringify(values, null, 2)}
        </Form>
      )}
    </Formik>
  )
}
