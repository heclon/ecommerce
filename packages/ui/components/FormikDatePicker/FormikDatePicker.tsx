/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from 'classnames'
import { Field, FieldProps, getIn } from 'formik'
import React from 'react'
import DatePicker from 'react-datepicker'
import { Cross, Tick } from '../GeneralIcons/GeneralIcons'
import './styles.css'

export interface DatePickerProps {
  id?: string
  name: string
  placeholder?: string
  required?: boolean
  label?: string
  testId?: string
  className?: string
  showInternalLabel?: boolean
  inputClassName?: string
  labelClassName?: string
  showInitialErrors?: boolean
  showHighlightStrip?: boolean
  disabled?: boolean
  maxDate?: Date
  minDate?: Date
  showYearDropdown?: boolean
  showCross?: boolean
  showTick?: boolean
}

export const FormikDatePicker = ({
  id,
  placeholder = 'Enter',
  required = false,
  name,
  label,
  testId = id,
  className = '',
  showInternalLabel = true,
  inputClassName = '',
  labelClassName = '',
  showInitialErrors = false,
  showHighlightStrip = true,
  disabled,
  maxDate,
  minDate,
  showYearDropdown,
  showCross,
  showTick,
}: DatePickerProps) => {
  return (
    <div className="mb-4">
      {showInternalLabel && label && (
        <label htmlFor={id} className={classNames(labelClassName, 'block font-normal')}>
          {label}
          {required ? <span className="align-super text-red-600">*</span> : ' '}
        </label>
      )}
      <Field name={name}>
        {({ field, form: { values, errors, touched, setFieldValue, setFieldTouched } }: FieldProps) => {
          const error = showInitialErrors || getIn(touched, field.name) ? getIn(errors, field.name) : undefined
          const valid = !error
          const withTick = showTick && valid && getIn(touched, name) && getIn(values, name)

          const withCross = showCross && !valid && getIn(touched, name) && !getIn(values, name)
          return (
            <div className={classNames(className, `text-input-wrap relative ${error ? 'has-error' : ''}`)}>
              <DatePicker
                id={id}
                name={field.name}
                data-testid={testId}
                onChange={(date: Date | null) => setFieldValue(field.name, date)}
                onBlur={() => setFieldTouched(field.name)}
                dateFormat="dd/MM/yyyy"
                placeholderText={`${placeholder}`}
                popperPlacement="top-start"
                selected={(field.value && new Date(field.value)) || null}
                disabled={disabled}
                maxDate={maxDate}
                minDate={minDate}
                showYearDropdown={showYearDropdown}
                className={classNames(
                  inputClassName,
                  `h-10 ${error ? 'border-red-600' : 'border-gray-200'}
                            rounded-md
                            text-input
                            focus:border-2
                            focus:border-blue-600
                            hover:border-blue-600
                            focus:outline-none
                            focus:ring-1
                            focus:ring-blue-600`
                )}
                strictParsing
              />

              {withCross && <Cross className="absolute top-2 right-1 ml-2 text-red-600" />}
              {withTick && <Tick className={`absolute right-1 top-2 ml-2 text-blue-600`} />}
              {showInternalLabel && (
                <label htmlFor={field.name} className={labelClassName}>
                  {error && <span className="mt-1 ml-1 text-base font-normal text-red-600">{error}</span>}
                </label>
              )}
              {showHighlightStrip && <span className="highlight-strip" />}
            </div>
          )
        }}
      </Field>
    </div>
  )
}
