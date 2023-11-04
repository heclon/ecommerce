import React from 'react'
import { Field, getIn } from 'formik'
import { Label } from '../Label'
import classNames from 'classnames'

export interface RadioButtonProps {
  name: string
  options: { value: string; label: string }[]
  disabled?: boolean
  errors: Record<string, string>
  className?: string
}
export const FormikRadioButtons = ({ disabled, name, options, errors, className }: RadioButtonProps): JSX.Element => {
  return (
    <>
      <div className={classNames('grid grid-cols-1 gap-4 md:grid-cols-2', className)}>
        {options.map((item, index) => {
          const id = `${name}-${item?.value}`
          return (
            <div key={`radio-button-${index}`} className="flex flex-row items-center">
              <Field
                key={item?.value}
                id={id}
                type="radio"
                name={name}
                value={item?.value}
                disabled={disabled}
                className={`mr-2 h-4 w-4  border-gray-300 ${
                  disabled ? 'text-gray-600 checked:bg-gray-600' : 'text-blue-600 focus:ring-blue-500'
                }`}
              />
              <Label htmlFor={id}> {item?.label} </Label>
            </div>
          )
        })}
      </div>
      <div>
        <p className="mt-2 ml-1 min-h-[1.25rem] text-xs font-semibold text-red-600">{getIn(errors, name)}</p>
      </div>
    </>
  )
}
