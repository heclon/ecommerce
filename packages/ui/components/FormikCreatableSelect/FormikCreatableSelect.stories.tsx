import React from 'react'
import { Form, Formik, FormikProps, FormikHelpers, Field } from 'formik'
import { ComponentStory } from '@storybook/react'
import CustomCreatableSelect from './CustomCreatableSelect'

export default {
  title: 'Components/Formik/FormikCreatableSelect',
  component: CustomCreatableSelect,
}

const CreatableSelectInput: ComponentStory<typeof CustomCreatableSelect> = (args) => <CustomCreatableSelect {...args} />

const languageOptions = [
  {
    label: 'Chinese',
    value: 'zh-CN',
  },
  {
    label: 'English (US)',
    value: 'en-US',
  },
]
interface FormValues {
  singleLanguage: string
  multipleLanguage: string[]
}
const defaultValues: FormValues = {
  singleLanguage: '',
  multipleLanguage: [],
}

const renderForm = (formikBag: FormikProps<FormValues>) => (
  <Form onSubmit={formikBag.handleSubmit}>
    <Field
      id="singleSelect"
      name="singleLanguage"
      options={languageOptions}
      component={CreatableSelectInput}
      placeholder="Select or create a language"
      isMulti={false}
    />
    <Field
      id="multiSelect"
      name="multipleLanguage"
      component={CreatableSelectInput}
      options={languageOptions}
      placeholder="Select or create multiple languages"
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
  <Formik initialValues={defaultValues} onSubmit={onSubmit}>
    {(formikBag) => {
      return renderForm(formikBag)
    }}
  </Formik>
)
