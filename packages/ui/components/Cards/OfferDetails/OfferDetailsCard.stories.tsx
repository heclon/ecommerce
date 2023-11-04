
import { ComponentMeta, ComponentStory } from '@storybook/react'
import faker from 'faker/locale/en'
import * as React from 'react'
import { OfferDetailsCard, OfferDetailsCardProps } from './index'

faker.seed(1)

export enum ProviderServiceOfferStatus {
  Booked,
  Accepted,
  Offered,
  Rejected,
  NotBooked,
  Declined,
}
export default {
  title: 'Components/Cards/Offer Details Card',
  component: OfferDetailsCard,
} as ComponentMeta<typeof OfferDetailsCard>

const Template: ComponentStory<typeof OfferDetailsCard> = (args: OfferDetailsCardProps) => {
  return <OfferDetailsCard {...args} />
}

export const OfferDetailsCardStory = Template.bind({})
OfferDetailsCardStory.args = {
  providerName: faker.company.companyName(),
  providerId: faker.datatype.string(10),
  description: faker.lorem.sentences(2),
  requestStatus: ProviderServiceOfferStatus.Booked,
}
export const OfferDetailsCardNoProviderId = Template.bind({})
OfferDetailsCardNoProviderId.args = {
  providerName: faker.company.companyName(),
  description: faker.lorem.sentences(2),
  requestStatus: ProviderServiceOfferStatus.Accepted,
}
