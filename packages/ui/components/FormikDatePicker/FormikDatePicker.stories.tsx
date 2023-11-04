import React from 'react'
import { FormikDatePicker } from './FormikDatePicker'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import formikDecorator from '../../.storybook/decorators/formikDecorator'
import { Formik, Form } from 'formik'

export default {
  title: 'Components/Formik/FormikDatePicker',
  component: FormikDatePicker,
  decorators: [formikDecorator],
} as ComponentMeta<typeof FormikDatePicker>

const Default: ComponentStory<typeof FormikDatePicker> = ({
  id,
  name,
  testId,
  label,
  placeholder,
  disabled,
  inputClassName,
  labelClassName,
}): JSX.Element => {
  return (
    <Formik
      initialValues={{
        startDate: undefined,
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
              <FormikDatePicker
                id={id}
                name={name}
                testId={testId}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
            </Form>
            <p className="mt-8 text-lg font-semibold">Form Values</p>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </>
        )
      }}
    </Formik>
  )
}

export const Primary = Default.bind({})
Primary.args = {
  id: 'startDate',
  testId: 'startDate',
  name: 'startDate',
  label: 'Start date',
  placeholder: 'Select a start date',
  disabled: false,
  inputClassName: '',
  labelClassName: '',
}
