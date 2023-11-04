import { ComponentMeta, ComponentStory } from '@storybook/react'
import * as React from 'react'
import { SuggestionMessage } from './index'

export default {
  title: 'Components/Suggestion Message',
  component: SuggestionMessage,
} as ComponentMeta<typeof SuggestionMessage>

const Template: ComponentStory<typeof SuggestionMessage> = (args) => {
  return <SuggestionMessage {...args} />
}

export const SuggestionMessageStory = Template.bind({})
SuggestionMessageStory.args = {
  title: 'We recommend partcipants that match your profile',
  body: "You will see requests from clients recommended for you here. Recommendations are made by matching your profile with the client's request. For more accurate matching please complete your profile. ",
}
