import React, { ReactElement } from 'react'

import { PlanImplementationFeedbackButton, FeedbackButtonProps } from './PlanImplementationFeedbackButton'

export default {
  title: 'Components/Strategy/EmojiFeedbackButton',
  component: PlanImplementationFeedbackButton,
  argsTypes: {
    clickFn: () => console.log('Hello'),
  },
}

export const Primary = (args: FeedbackButtonProps): ReactElement => (
  <PlanImplementationFeedbackButton {...args}>😀</PlanImplementationFeedbackButton>
)
