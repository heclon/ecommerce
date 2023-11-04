import React from 'react'
import { Formik, FormikProps } from 'formik'
import { FormikTextArea } from './FormikTextArea'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Formik/FormikTextArea',
  component: FormikTextArea,
} as ComponentMeta<typeof FormikTextArea>
const Input: ComponentStory<typeof FormikTextArea> = (args) => <FormikTextArea {...args} />

interface FormValues {
  description: string
}

export const Primary = (): JSX.Element => (
  <div>
    <Formik
      initialValues={{ description: '' }}
      validate={(): { description: string } => {
        return { description: '' }
      }}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ values, handleChange, handleSubmit }: FormikProps<FormValues>): JSX.Element => (
        <>
          <form onSubmit={handleSubmit} className="">
            <Input
              id="description"
              name="description"
              // internalLabel={true}
              label="Description"
              // required={true}
              placeholder="Tell us about yourself"
              showHighlightStrip={true}
              showTick={true}
              onChange={handleChange}
              value={values.description}
              className="mb-8"
            />
          </form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  </div>
)
