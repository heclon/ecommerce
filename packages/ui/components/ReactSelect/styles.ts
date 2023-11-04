import { CSSObjectWithLabel } from 'react-select'
import { OptionProps } from 'react-select/dist/declarations/src/components/Option'
import { ReactSelectOptions } from './types'

const borderSelectStyle = '1px solid rgba(78,66,221, 1)'
const borderSelectStyleOnError = '1px solid rgba(252, 165, 165, 1)'

export const customSelectStyles = (error: boolean) => {
  const optionColor = 'rgba(75, 85, 99, 1)'
  return {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      '&:focus': {
        border: borderSelectStyle,
        outline: 'none',
      },
      '&:focus-within': {
        border: borderSelectStyle,
        outline: 'none',
        boxShadow: '0.5px 0.5px 1px 1px rgba(78,66,221, 1)',
      },
      '&:active': {
        border: borderSelectStyle,
        outline: 'none',
      },
      ...(error && {
        border: borderSelectStyleOnError,
        boxShadow: '0.5px 0.5px 1px 1px rgba(239, 68, 68, 1)',
        '&:hover': {
          border: borderSelectStyleOnError,
        },
        '&:active': {
          border: '1px solid rgba(239, 68, 68, 1)',
          outline: 'none',
        },
        '&:focus': {
          border: borderSelectStyleOnError,
        },
      }),
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
      ...base,
      color: 'rgba(29, 78, 216,1)',
      padding: '0.2rem',
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
      ...base,
      color: 'rgba(29, 78, 216,1)',
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: '0.875rem',
      color: `${error ? 'rgba(127, 29, 29,1)' : optionColor}`,
    }),
    option: (base: CSSObjectWithLabel, { isSelected }: OptionProps<ReactSelectOptions>) => ({
      ...base,
      backgroundColor: isSelected ? 'rgba(29, 78, 216,1)' : 'white',
      color: isSelected ? 'white' : optionColor,
      '&:active': {
        backgroundColor: 'white',
        color: optionColor,
      },
      '&:hover': {
        backgroundColor: 'rgba(29, 78, 216,1)',
        color: 'white',
      },
      cursor: 'pointer',
      paddingLeft: '2.5rem',
    }),
  }
}
