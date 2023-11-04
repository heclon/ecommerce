import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Examples from './Examples'

const defaultTitle = 'Ecommerce Is Great!'
const defaultParagraph = 'We are a leading Ecommerce provider in the private sector.'

export default {
  title: 'Components/Typography',
  component: Examples,
} as ComponentMeta<typeof Examples>

const Template: ComponentStory<typeof Examples> = (args) => {
  return <Examples {...args} />
}

export const ExamplesStory = Template.bind({})
ExamplesStory.args = {
  heading1: defaultTitle,
  heading2: defaultTitle,
  paragraph: defaultParagraph,
  small: defaultParagraph,
  strong: defaultParagraph,
  emphasis: defaultParagraph,
  listItems: ['List Item', 'List Item', 'List Item'],
  numberListItems: ['List Item', 'List Item', 'List Item'],
}
