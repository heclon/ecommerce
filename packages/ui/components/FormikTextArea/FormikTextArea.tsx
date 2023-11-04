/* eslint-disable sonarjs/cognitive-complexity */

import React, { CSSProperties, useRef } from 'react'
import { Field, FieldProps, getIn } from 'formik'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { Cross, Tick } from '../GeneralIcons/GeneralIcons'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface TextAreaProps {
  id: string
  name: string
  label?: string | React.ReactNode
  className?: string
  inputClassName?: string
  labelClassName?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  showTick?: boolean
  showCross?: boolean
  required?: boolean
  testId?: string
  styles?: CSSProperties
  showInitialErrors?: boolean
  showHighlightStrip?: boolean
  internalLabel?: boolean
  icon?: IconDefinition
  minHeight?: string
  readOnly?: boolean
  value?: string | null | undefined
  onChange?: (field: string, value: unknown) => void
  numberOfRows?: number
}

export const FormikTextArea = ({
  id,
  name,
  label,
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled,
  placeholder,
  showTick = false,
  showCross = true,
  required = false,
  testId = id,
  showInitialErrors = false,
  showHighlightStrip = true,
  internalLabel = true,
  icon,
  readOnly = false,
  numberOfRows,
}: TextAreaProps): JSX.Element => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = React.useState(false)

  return (
    <Field name={name}>
      {({ field, form: { errors, touched, values } }: FieldProps): React.ReactNode => {
        const { onBlur: handleBlur, onChange, name: fieldName, value } = field
        const error = showInitialErrors || getIn(touched, name) ? getIn(errors, name) : undefined
        const valid = !error
        const withTick = showTick && valid && getIn(touched, name) && getIn(values, name)
        const withCross = showCross && !valid && getIn(touched, name) && !getIn(values, name)
        return (
          <div className={classNames(className, '')}>
            {internalLabel && label && (
              <label htmlFor={id} className={classNames(labelClassName, 'block text-gray-700 font-semibold mb-1')}>
                {label}
                {internalLabel && required ? <span className="align-super text-red-600">*</span> : ' '}
              </label>
            )}
            <div className="relative inline-block w-full">
              {!!icon && (
                <div className="absolute z-10 mx-3 flex h-full items-center text-gray-300">
                  <FontAwesomeIcon icon={icon} size="lg" />
                </div>
              )}

              <textarea
                name={fieldName || name}
                onFocus={(): void => setFocused(true)}
                onBlur={(e): void => {
                  setFocused(false)
                  handleBlur(e)
                }}
                onChange={(e): void => onChange(e)}
                id={id}
                ref={inputRef}
                className={classNames(
                  inputClassName,
                  `relative block text-lg w-full ${
                    error ? 'border-red-600' : 'border-gray-200'
                  } rounded-md focus:border-blue-600  focus:ring-blue-600 focus:ring-1 focus:outline-none mb-0 relative text-lg ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  } `
                )}
                value={value}
                disabled={disabled}
                rows={numberOfRows || 5}
                placeholder={placeholder || `Enter your ${label}`}
                autoComplete="off"
                data-testid={testId}
                readOnly={readOnly}
              />

              {showHighlightStrip && error && <span className="absolute inset-0 h-full w-2 rounded-l-md bg-red-600" />}
              {showHighlightStrip && focused && (
                <span className="absolute inset-0 h-full w-2 rounded-l-md bg-blue-600" />
              )}
              {withCross && <Cross className="absolute top-2.5 right-1 ml-2 text-red-600" />}
              {withTick && <Tick className={`absolute right-2 bottom-2.5 ml-2 text-blue-600`} />}
            </div>
            <p className={`${error ? 'block' : 'hidden'} ml-1 text-base font-normal text-red-600`}>
              {getIn(errors, name)}
            </p>
          </div>
        )
      }}
    </Field>
  )
}
