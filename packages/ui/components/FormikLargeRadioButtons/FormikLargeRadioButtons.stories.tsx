import React from 'react'
import { FormikLargeRadioButtons } from './FormikLargeRadioButtons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import formikDecorator from '../../.storybook/decorators/formikDecorator'

const hoursPerWeekOptions = [
  { label: '1', value: 'cl4dnjb2t0042o3r546s8waat' },
  { label: '2-10', value: 'cl4dnjb2t0044o3r5w36n1bf3' },
  { label: '11-50', value: 'cl4dnjb2t0046o3r53mhk9b0c' },
  { label: '51+', value: 'cl4dnjb2t0048o3r5w3vv0hll' },
]

const teleHealthOptions = [
  { value: 'providersPremises', label: "at the provider's premises" },
  { value: 'phoneOrVideoCall', label: 'via a phone or video call' },
  { value: 'myHome', label: 'at my home' },
]

export default {
  title: 'Components/Formik/FormikLargeRadioButtons',
  component: FormikLargeRadioButtons,
  decorators: [formikDecorator],
} as ComponentMeta<typeof FormikLargeRadioButtons>

const Template: ComponentStory<typeof FormikLargeRadioButtons> = ({ values }) => {
  return (
    <>
      <h1 className="my-4 text-4xl font-bold">Horizontal</h1>
      <FormikLargeRadioButtons
        options={hoursPerWeekOptions}
        name="hoursPerWeek"
        values={values}
        direction="horizontal"
      />
      <h1 className="my-4 text-4xl font-bold">Vertical</h1>
      <FormikLargeRadioButtons options={teleHealthOptions} name="teleHealth" values={values} direction="vertical" />
    </>
  )
}

export const FormikLargeRadioButtonsStory = Template.bind({})
FormikLargeRadioButtonsStory.args = { values: { hoursPerWeek: '', teleHealthOptions: '' } }
