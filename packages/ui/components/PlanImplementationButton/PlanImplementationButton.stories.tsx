import React, { ReactElement } from 'react'
import { PlanImplementationButton, PIButtonProps } from './PlanImplementationButton'
export default {
  title: 'Components/Strategy/Button',
  component: PlanImplementationButton,
  args: {
    buttonText: 'Request a service',
    backgroundColor: 'bg-blue-600',
    textColor: 'text-white',
  },
}
export const Primary = (args: PIButtonProps): ReactElement => <PlanImplementationButton {...args} />
