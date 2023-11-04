import React, { ReactElement } from 'react'
import { AddressSearch, AddressSearchProps } from './AddressSearch'

export default {
  title: 'Components/Forms/AddressSearch',
  component: AddressSearch,
  argTypes: {
    placeholder: {
      type: 'string',
      defaultValue: 'Search for an address',
    },
  },
}

export const Primary = (args: AddressSearchProps): ReactElement => (
  <AddressSearch
    {...args}
    onSelect={() => {
      return
    }}
    apiKey={'UseRealAPIKeyHereToSeeResults'}
    className="w-1/2"
  />
)
