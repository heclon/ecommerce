import { ComponentStory, ComponentMeta } from '@storybook/react'
import * as React from 'react'
import { PortalButton } from './index'

export default {
  title: 'Components/Portal Button',
  component: PortalButton,
} as ComponentMeta<typeof PortalButton>

const Template: ComponentStory<typeof PortalButton> = (args) => {
  return <PortalButton {...args}>Yes</PortalButton>
}

export const PortalButtonStory = Template.bind({})
PortalButtonStory.args = { variant: 'is-secondary' }
