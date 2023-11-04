import React from 'react'
import { Formik } from 'formik'
import { FormikTextInput } from './FormikTextInput'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Formik/FormikTextInput',
  component: FormikTextInput,
} as ComponentMeta<typeof FormikTextInput>
const Input: ComponentStory<typeof FormikTextInput> = (args) => <FormikTextInput {...args} />

export const Primary = (): JSX.Element => (
  <div>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors = { email: '', password: '' }
        if (!values.email) {
          errors.email = 'Please enter an email'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <>
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              name="email"
              internalLabel={true}
              label="Email"
              required={true}
              placeholder="Email"
              showHighlightStrip={true}
              showTick={true}
              onChange={handleChange}
              value={values?.email}
              className="mb-8"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              required={true}
              showHighlightStrip={false}
              showTick={true}
              disabled={true}
              onChange={handleChange}
              value={values.password}
            />
            <p className="text-xs text-red-600">{errors.password && touched.password && errors.password}</p>
          </form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  </div>
)
