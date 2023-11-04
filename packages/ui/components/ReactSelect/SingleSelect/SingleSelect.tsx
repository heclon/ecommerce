import React from 'react'
import Select, {
  ActionMeta,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MenuProps,
  OptionsOrGroups,
  SingleValue,
} from 'react-select'
import { customSelectStyles } from '../styles'
import { SelectorIcon } from '@heroicons/react/solid'
import { ReactSelectOptions } from '../types'
import './SingleSelect.css'

export interface SingleSelectProps {
  label: string
  selected: ReactSelectOptions | null
  options: OptionsOrGroups<ReactSelectOptions, GroupBase<ReactSelectOptions>>
  onChange?: (newValue: SingleValue<ReactSelectOptions>, actionMeta: ActionMeta<ReactSelectOptions>) => void
  error?: boolean
  [x: string]: unknown
}

//TODO: Extract components.Menu to a separate component
const Menu = (props: MenuProps<ReactSelectOptions, false, GroupBase<ReactSelectOptions>>) => {
  const innerProps = {
    ...props.innerProps,
    className:
      'overflow-auto absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 truncate font-normal text-base text-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  }
  return (
    <components.Menu {...props} innerProps={innerProps}>
      {props.children}
    </components.Menu>
  )
}

//TODO: Extract components.DropdownIndicator to a separate component
const SingleDropdownIndicator = (
  props: DropdownIndicatorProps<ReactSelectOptions, false, GroupBase<ReactSelectOptions>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectorIcon className="h-5 w-5" aria-hidden="true" />
    </components.DropdownIndicator>
  )
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  selected,
  options,
  error,
  onChange,
  ...rest
}): JSX.Element => {
  // Contains default props that can be overridden
  const props = {
    isSearchable: true,
    closeMenuOnSelect: true,
    isClearable: true,
    backspaceRemovesValue: true,
    blurInputOnSelect: true,
    escapeClearsValue: true,
    placeholder: 'Please type here..',
    error,
    ...rest,
  }

  return (
    <>
      <div className="mt-1 block text-sm font-medium text-gray-700">{label}</div>

      <Select
        value={selected}
        aria-label={label}
        isMulti={false}
        options={options}
        onChange={onChange}
        components={{
          DropdownIndicator: SingleDropdownIndicator,
          Menu,
        }}
        styles={customSelectStyles(!!error)}
        {...props}
      />
    </>
  )
}
