import React from 'react'
import { Form, Formik, FormikValues } from 'formik'
import { DecoratorFn } from '@storybook/react'

const formikDecorator: DecoratorFn = (Story, context) => {
  const { parameters } = context
  return (
    <Formik
      initialValues={parameters.initialValues || {}}
      onSubmit={async (values: FormikValues) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {() => (
        <Form>
          <Story />
        </Form>
      )}
    </Formik>
  )
}
export default formikDecorator
