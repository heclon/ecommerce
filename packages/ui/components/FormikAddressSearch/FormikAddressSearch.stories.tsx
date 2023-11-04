import React, { ReactElement } from 'react'
import { FormikAddressSearch, FormikAddressSearchProps } from './FormikAddressSearch'
import { Formik, Form } from 'formik'
export default {
  title: 'Components/Formik/FormikAddressSearch',
  component: FormikAddressSearch,
  argTypes: {
    placeholder: {
      type: 'string',
      defaultValue: 'Search for an address',
    },
  },
}

export const Secondary = (args: FormikAddressSearchProps): ReactElement => {
  return (
    <Formik
      initialValues={{
        address: '',
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values }) => (
        <Form>
          <FormikAddressSearch {...args} apiKey={'REAL_ONE_HERE'} className="w-1/2" />
          <button type="submit">Submit</button>
          {JSON.stringify(values, null, 2)}
        </Form>
      )}
    </Formik>
  )
}
