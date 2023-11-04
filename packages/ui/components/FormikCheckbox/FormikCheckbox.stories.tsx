import React, { ReactElement } from 'react'
import { FormikCheckbox } from './FormikCheckbox'
import { Formik, Form } from 'formik'
export default {
  title: 'Components/Formik/FormikCheckbox',
  component: FormikCheckbox,
}
const options = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'fr',
    name: 'French',
  },
  {
    id: 'es',
    name: 'Spanish',
  },
]
export const Primary = (): ReactElement => {
  return (
    <Formik
      initialValues={{
        toggle: false,
        checked: [],
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values }) => (
        <Form>
          <FormikCheckbox name="checked" options={options} disabled={true} />

          <button type="submit">Submit</button>
          {JSON.stringify(values, null, 2)}
        </Form>
      )}
    </Formik>
  )
}
