import { Field, FormikErrors, getIn } from 'formik'
import React from 'react'

export interface Option {
  id: string
  name: string
}
export interface CheckboxProps<TV> {
  name: string
  options: Array<Option>
  className?: string
  disabled?: boolean
  errors?: FormikErrors<TV>
}

export const FormikCheckbox = <TV extends object>({
  name,
  options,
  disabled,
  errors,
}: CheckboxProps<TV>): JSX.Element => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {options.map((option: Option) => {
          const id = `${name}-${option.id}`
          return (
            <div key={option.id} className="flex flex-row items-center">
              <Field
                name={name}
                id={id}
                type="checkbox"
                disabled={disabled}
                value={option.id}
                className={`mr-1 h-4 w-4 rounded  border-gray-600 ${
                  disabled ? 'text-gray-600 checked:bg-gray-600' : 'text-blue-600 focus:ring-blue-500'
                }`}
              />
              <label className="ml-2 text-sm md:text-base" htmlFor={id}>
                {option.name}
              </label>
            </div>
          )
        })}
      </div>

      <p className="mt-2 ml-1 text-xs font-semibold text-red-600">{getIn(errors, name)}</p>
    </>
  )
}
