import React from 'react'
import { ServiceRequestInfoLabel } from './ServiceRequestInfoLabel'
import { ComponentStory, Meta } from '@storybook/react'

export default {
  title: 'Components/Label/ServiceRequestInfoLabel',
  component: ServiceRequestInfoLabel,
} as Meta

const Default: ComponentStory<typeof ServiceRequestInfoLabel> = ({
  supportName,
  clientName,
  location,
}): JSX.Element => {
  return <ServiceRequestInfoLabel supportName={supportName} clientName={clientName} location={location} />
}

export const ServiceRequestInfoLabelStory = Default.bind({})
ServiceRequestInfoLabelStory.args = {
  supportName: 'Demo support name',
  clientName: `Demo client's name`,
  location: 'Demo location CBD',
}
