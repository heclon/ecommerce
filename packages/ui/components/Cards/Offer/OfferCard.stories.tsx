import { ComponentStory, ComponentMeta } from '@storybook/react'
import * as React from 'react'
import { OfferCard, OfferCardProps } from './index'

export default {
  title: 'Components/Cards/Basic Offer Card',
  component: OfferCard,
} as ComponentMeta<typeof OfferCard>

const Template: ComponentStory<typeof OfferCard> = (args: OfferCardProps) => {
  return <OfferCard {...args} />
}

export const OfferCardStory = Template.bind({})
OfferCardStory.args = { title: 'Your service   ', numberOfOffers: 10 }
