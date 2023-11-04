import React from 'react'
import { Field, FieldProps, ErrorMessage } from 'formik'
import { Cross, Tick } from '../GeneralIcons'
import classNames from 'classnames'

export const errorLabelStyle = 'text-base font-normal text-red-600 ml-1'

export interface PhoneNumberInputProps {
  id: string
  name: string
  placeholder?: string
  inputClassName?: string
  disabled?: boolean
}

export const FormikPhoneNumberInput = ({ name, id, placeholder, inputClassName, disabled }: PhoneNumberInputProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const { error, touched } = meta
        return (
          <div className="relative">
            <input
              id={id}
              type="string"
              placeholder={placeholder || 'Enter your phone number'}
              className={classNames(
                inputClassName,
                ` w-full relative text-lg ${error && touched ? 'border-red-600' : 'border-gray-200'} ${
                  disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                } rounded-md
                  focus:ring-blue-primary
                  focus:ring-1
                  focus:border-blue-primary
                  focus:ring-blue-primary
                  focus:outline-none
                  w-full
                  px-4
                  rounded-md
                  border-2
                  h-10
                  `
              )}
              {...field}
              value={form.values[name]}
              onChange={(event) => {
                const re = /^[0-9\b]+$/
                if (event.target.value === '' || re.test(event.target.value)) {
                  form.setFieldValue(field.name, event.target.value)
                }
              }}
            />
            {touched && error && <Cross className={`absolute top-2 right-2 z-10 text-red-600`} />}
            {touched && !error && <Tick className={`text-blue-primary absolute top-2 right-2 z-10`} />}
            <div className="!h-6 !pb-4">
              <ErrorMessage name={name} component="span" className={errorLabelStyle} />
            </div>
          </div>
        )
      }}
    </Field>
  )
}
