/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldProps } from 'formik'
import React from 'react'
import Select, { components, CSSObjectWithLabel } from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

export interface Option {
  label: string
  value: string
}

export type OptionsType<OptionType> = OptionType[]
export type ValueType<OptionType> = OptionType | OptionsType<OptionType> | null | undefined

export interface CustomSelectProps
  extends FieldProps,
    Pick<
      StateManagerProps,
      'id' | 'isMulti' | 'inputId' | 'instanceId' | 'className' | 'placeholder' | 'name' | 'menuPortalTarget'
    > {
  options: OptionsType<Option>
  error?: boolean
  disabled?: boolean
  isClearable?: boolean
  isSearchable?: boolean
}

const MultiValueContainer = (props: any) => {
  const innerProps = {
    className: 'inline-flex rounded-full text-sm font-medium bg-blue-300',
  }

  return (
    <div className="items-center space-y-2 p-1 sm:flex-row sm:space-y-0 sm:space-x-4">
      <components.MultiValueContainer {...props} innerProps={innerProps} />
    </div>
  )
}

export const CustomSelect = ({
  id,
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  error,
  disabled,
  inputId,
  instanceId,
  menuPortalTarget,
  isClearable,
  isSearchable,
}: CustomSelectProps): any => {
  const focusBorder = '2px solid #8C14FC'
  const errorBorder = '1px solid rgba(252, 165, 165, 1)'

  const customStyles = {
    menuPortal: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: 9999,
    }),
    control: (base: CSSObjectWithLabel) => ({
      ...base,

      borderColor: '#E5E7EB',
      borderWidth: '0.125rem',
      borderRadius: '0.375rem',
      '&:focus': {
        border: focusBorder,
        outline: 'none',
        borderWidth: '2px',
      },
      '&:hover': {
        borderColor: '#6D28D9',
        boxShadow:
          '--tw-ring-offset-color: #6D28D9; --tw-ring-offset-width: 4px;' +
          'box-shadow:0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)',
      },
      boxShadow: '2px',
      verticalAlign: 'middle',
      paddingLeft: '0.65rem',
      paddingRight: '0.65rem',
      fontSize: '1.125rem',

      '&:focus-within': {
        border: focusBorder,
        outline: 'none',
        boxShadow: '0.5px 0.5px 1px 1px rgba(78,66,221, 1)',
      },
      '&:active': {
        border: focusBorder,
        outline: 'none',
      },
      ...(error && {
        border: errorBorder,
        boxShadow: '0.5px 0.5px 1px 1px rgba(239, 68, 68, 1)',
        '&:hover': {
          // borderColor: 'rgba(252, 165, 165, 1)',
          border: errorBorder,
        },
        '&:active': {
          border: '1px solid rgba(239, 68, 68, 1)',
          outline: 'none',
        },
        '&:focus': {
          border: errorBorder,
        },
      }),
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
      ...base,
      color: 'rgba(59, 50, 158,1)',
      fontSize: '1.125rem',
      padding: '0.2rem',
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
      ...base,
      color: 'rgba(59, 50, 158,1)',
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: '1.125rem',
      color: `${error ? 'rgba(127, 29, 29,1)' : 'rgba(75, 85, 99, 1)'}`,
    }),
    option: (base: CSSObjectWithLabel, selected: { isSelected: boolean }) => ({
      ...base,
      color: 'rgba(75, 85, 99, 1)',
      fontSize: '1.125rem',
      backgroundColor: selected.isSelected ? 'rgba(78,66,221, 0.1)' : 'white',
      '&:active': {
        backgroundColor: 'white',
        color: 'black',
      },
      '&:hover': {
        backgroundColor: 'rgba(78,66,221, 0.1)',
        color: 'black',
      },
      cursor: 'pointer',
      paddingLeft: '2.5rem',
    }),
  }

  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
      return isMulti ? [] : ('' as any)
    }
  }

  return (
    <Select
      id={id}
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      onBlur={() => form.setFieldTouched(field.name)}
      placeholder={placeholder}
      options={options}
      components={{
        MultiValueContainer,
      }}
      isMulti={isMulti}
      isDisabled={disabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      styles={customStyles}
      inputId={inputId}
      instanceId={instanceId}
      menuPortalTarget={menuPortalTarget}
    />
  )
}

export default CustomSelect
