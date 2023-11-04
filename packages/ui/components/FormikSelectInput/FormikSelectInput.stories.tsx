import React from 'react'
import { Field, Form, Formik, FormikProps, FormikHelpers } from 'formik'
import CustomSelect from './CustomSelect'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Formik/FormikSelectInput',
  component: CustomSelect,
} as ComponentMeta<typeof CustomSelect>

const SelectInput: ComponentStory<typeof CustomSelect> = (args) => <CustomSelect {...args} />

const languageOptions = [
  {
    label: 'Chinese',
    value: 'zh-CN',
  },
  {
    label: 'English (US)',
    value: 'en-US',
  },
  {
    label: 'English (GB)',
    value: 'en-GB',
  },
  {
    label: 'French',
    value: 'fr-FR',
  },
  {
    label: 'Spanish',
    value: 'es-ES',
  },
]
export interface FormValues {
  singleLanguage: string
  multiLanguages: string[]
}
const defaultValues: FormValues = {
  singleLanguage: '',
  multiLanguages: [],
}

const renderForm = (formikBag: FormikProps<FormValues>) => (
  <Form>
    <Field
      id="singleSelect"
      name="singleLanguage"
      options={languageOptions}
      component={SelectInput}
      placeholder="Select a language..."
      isMulti={false}
    />
    <Field
      className="mt-4"
      name="multiLanguages"
      options={languageOptions}
      component={SelectInput}
      placeholder="Select multi languages..."
      isMulti={true}
    />
    <button
      type="button"
      className="my-4 mr-4 rounded-md border border-blue-300 py-2 px-4 text-blue-600"
      onClick={formikBag.handleReset}
      disabled={!formikBag.dirty || formikBag.isSubmitting}
    >
      Reset
    </button>
    <button className="my-4 rounded-md bg-blue-600 py-2 px-4 text-white" type="submit">
      Submit Form
    </button>
  </Form>
)

const onSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
  alert(JSON.stringify(values, null, 2))
  formikHelpers.setSubmitting(false)
}

export const Primary = (): JSX.Element => (
  <Formik initialValues={defaultValues} render={renderForm} onSubmit={onSubmit} />
)
