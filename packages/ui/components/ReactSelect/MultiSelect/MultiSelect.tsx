import { SelectorIcon } from '@heroicons/react/solid'
import React, { useRef } from 'react'
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  MenuProps,
  MultiValue,
  MultiValueGenericProps,
  OptionsOrGroups,
  SelectInstance,
} from 'react-select'
import { customSelectStyles } from '../styles'
import { ReactSelectOptions } from '../types'

export interface MultiSelectProps {
  label: string
  options: OptionsOrGroups<ReactSelectOptions, GroupBase<ReactSelectOptions>>
  selected: string[]
  canSelectAll?: boolean
  onChange: (selectedValues: string[]) => void
  error?: boolean
  [x: string]: unknown
}

const DropdownIndicator = (props: DropdownIndicatorProps<ReactSelectOptions, true, GroupBase<ReactSelectOptions>>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectorIcon className="h-5 w-5" aria-hidden="true" />
    </components.DropdownIndicator>
  )
}

const MultiValueContainer = (props: MultiValueGenericProps<ReactSelectOptions>) => {
  const innerProps = {
    className: 'inline-flex rounded-full text-sm font-medium bg-blue-300',
  }

  return (
    <div className="items-center space-y-2 p-1 sm:flex-row sm:space-y-0 sm:space-x-4">
      <components.MultiValueContainer {...props} innerProps={innerProps} />
    </div>
  )
}

const Menu = (props: MenuProps<ReactSelectOptions, true, GroupBase<ReactSelectOptions>>) => {
  const innerProps = {
    ...props.innerProps,
    className:
      'overflow-auto absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 truncate font-normal text-base text-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  }
  return (
    <components.Menu<ReactSelectOptions, true, GroupBase<ReactSelectOptions>> {...props} innerProps={innerProps}>
      {props.children}
    </components.Menu>
  )
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  label,
  selected,
  canSelectAll,
  error,
  onChange,
  ...rest
}): JSX.Element => {
  // Map options and selected props (used by legacy multi-select) to react-select props
  const reactSelectOptions: OptionsOrGroups<ReactSelectOptions, GroupBase<ReactSelectOptions>> = options
  const selectRef = useRef<SelectInstance<ReactSelectOptions, true> | null>(null)
  const reactSelectOptionsWithSelectAll = [{ label: 'Select All', value: 'all' }, ...reactSelectOptions]

  const onlyOptions: readonly ReactSelectOptions[] = [
    ...reactSelectOptions.filter(
      (og: ReactSelectOptions | GroupBase<ReactSelectOptions>): og is ReactSelectOptions => 'value' in og
    ),
    ...reactSelectOptions
      .filter(
        (og: ReactSelectOptions | GroupBase<ReactSelectOptions>): og is GroupBase<ReactSelectOptions> => 'options' in og
      )
      .flatMap((g) => g.options),
  ]

  const reactSelectedValues: ReactSelectOptions[] = selected
    .map((selectedOption) => onlyOptions.find((o) => o.value === selectedOption))
    .filter(Boolean) as ReactSelectOptions[]

  const customOnChangeHandler = (newValue: MultiValue<ReactSelectOptions>) => {
    const isSelectAll = newValue.length && newValue.find((option) => option.value === 'all')
    if (isSelectAll) {
      onChange(onlyOptions.map((option) => option?.value))
      selectRef?.current?.blur()
    } else {
      onChange(newValue.map((reactSelectOption) => reactSelectOption.value))
    }
  }

  // Contains default props that can be overridden
  const props = {
    isSearchable: false,
    closeMenuOnSelect: false,
    placeholder: 'Please select an item',
    error,
    ...rest,
  }

  return (
    <>
      <div className="mt-1 block text-sm font-medium text-gray-700">{label}</div>

      <Select
        ref={selectRef}
        aria-label={label}
        isMulti
        options={canSelectAll ? reactSelectOptionsWithSelectAll : reactSelectOptions}
        value={reactSelectedValues}
        onChange={customOnChangeHandler}
        components={{
          DropdownIndicator,
          MultiValueContainer,
          Menu,
        }}
        styles={customSelectStyles(!!error)}
        {...props}
      />
    </>
  )
}
