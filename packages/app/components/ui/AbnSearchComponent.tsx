import React, { useState } from 'react'
import { useSearchAbnDetailsQuery } from '../provider/profile/graphql/searchAbnDetails.generated'
import { useDebounce } from 'use-debounce'
import { SingleSelect } from '@ecommerce/ui'
import { ReactSelectOptions } from '@ecommerce/ui/components/ReactSelect/types'
import { Options, SingleValue } from 'react-select'

interface Props {
  error?: boolean
  onChange?: (newValue: SingleValue<ReactSelectOptions>) => void
  selected: ReactSelectOptions
}

export const AbnSearchComponent: React.FC<Props> = ({ selected, onChange, error }): JSX.Element => {
  const [searchString, setSearchString] = useState('')
  const [debouncedValue] = useDebounce(searchString, 1000)

  const optionsQuery = {
    pause: !debouncedValue,
    variables: {
      searchString: debouncedValue,
    },
  }

  const [result] = useSearchAbnDetailsQuery(optionsQuery)

  const options: Options<ReactSelectOptions> =
    result.data?.searchAbnDetails?.map((entity) => ({
      label: `${entity?.organisationName} - ${entity?.abn}`,
      value: entity?.abn || 'Invalid ABN',
    })) ?? []

  const onInputChangeHandler = (newValue: string) => {
    setSearchString(newValue)
  }

  return (
    <SingleSelect
      id="abn"
      instanceId="abn"
      label={''}
      selected={options.find((o) => o.value == selected?.value) || selected}
      onChange={onChange}
      options={options}
      isLoading={result.fetching}
      onInputChange={onInputChangeHandler}
      error={error}
    />
  )
}
