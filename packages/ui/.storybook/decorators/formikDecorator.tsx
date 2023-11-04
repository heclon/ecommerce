import React from 'react'
import { Formik } from 'formik'
import { ComponentStory } from '@storybook/react'
export const mockInitialValues = {
  supportNumber: '',
  supportName: '',
  disabilities: '',
  otherIssues: '',
  description: '',
  hoursPerWeek: '',
  times: [
    {
      day: '',
      time: '',
      preferredTime: '',
    },
  ],
  teleHealth: '',
  travel: '',
  unwantedProviders: '',
  preferences: '',
  behaviouralSupportNeeds: '',
}

const formikDecorator = (Story: ComponentStory<any>) => (
  <Formik
    validationSchema={[]}
    initialValues={mockInitialValues}
    onSubmit={(values) => console.log(values)}
  >
    {() => {
      return ( <Story />)
    }}

  </Formik>
)
export default formikDecorator
