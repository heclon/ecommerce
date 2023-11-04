import React from 'react'
import { Formik, FormikProps } from 'formik'
import { FormikPhoneNumberInput } from './FormikPhoneNumberInput'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Formik/FormikPhoneNumberInput',
  component: FormikPhoneNumberInput,
} as ComponentMeta<typeof FormikPhoneNumberInput>
const Input: ComponentStory<typeof FormikPhoneNumberInput> = (args) => <FormikPhoneNumberInput {...args} />

interface FormValues {
  phone: string
}

export const Primary = (): JSX.Element => (
  <div>
    <Formik
      initialValues={{ phone: '' }}
      validate={(): { phone: string } => {
        return { phone: '' }
      }}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ values, handleSubmit }: FormikProps<FormValues>): JSX.Element => (
        <>
          <form onSubmit={handleSubmit} className="">
            <Input id="users-phone" name="phone" placeholder="Enter your phone number" />
          </form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  </div>
)
