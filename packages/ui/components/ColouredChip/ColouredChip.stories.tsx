import { ComponentStory, ComponentMeta } from '@storybook/react'
import * as React from 'react'
import { ColouredChip, ColouredChipProps } from './index'

export default {
  title: 'Components/Coloured Chip',
  component: ColouredChip,
} as ComponentMeta<typeof ColouredChip>

const Template: ComponentStory<typeof ColouredChip> = (args: ColouredChipProps) => {
  return <ColouredChip {...args} />
}

export const ColouredChipStory = Template.bind({})
ColouredChipStory.args = {
  key: 'Product ',
  label: 'Service Available',
  withIcon: true,
}
