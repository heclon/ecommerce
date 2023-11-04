/* eslint-disable sonarjs/cognitive-complexity */
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Field, FieldProps, getIn } from 'formik'
import React, { CSSProperties, useRef, useState } from 'react'
import { Cross, Eye, EyeOff, Tick } from '../GeneralIcons'

interface InputProps {
  id: string
  name: string
  label?: string | React.ReactNode
  type?: string
  className?: string
  inputClassName?: string
  labelClassName?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  showTick?: boolean
  showCross?: boolean
  required?: boolean
  optional?: boolean
  testId?: string
  styles?: CSSProperties
  showInitialErrors?: boolean
  showHighlightStrip?: boolean
  internalLabel?: boolean
  icon?: IconDefinition
  minHeight?: string
  readOnly?: boolean
  autoComplete?: string
  value?: string | number | readonly string[] | undefined
  onChange?: (field: string, value: unknown) => void
}

export const FormikTextInput = ({
  id,
  name,
  type = 'text',
  label,
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled,
  placeholder,
  showTick = false,
  showCross = true,
  required = false,
  optional = false,
  testId = id,
  showInitialErrors = false,
  showHighlightStrip = true,
  internalLabel = true,
  icon,
  readOnly = false,
  autoComplete = 'off',
}: InputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = React.useState(false)
  /// @TODO use the below handleChange nt pass the value to the onChange function
  return (
    <Field name={name}>
      {({ field, form: { errors, touched, values } }: FieldProps): React.ReactNode => {
        const { onBlur: handleBlur, onChange, name: fieldName, value } = field
        const error = showInitialErrors || getIn(touched, name) ? getIn(errors, name) : undefined

        const valid = !error
        const withTick = showTick && valid && getIn(touched, name) && getIn(values, name)
        const withCross = showCross && !valid && getIn(touched, name) && !getIn(values, name)
        return (
          <div className={classNames(className, 'mb-4')}>
            {internalLabel && label && (
              <label htmlFor={id} className={classNames(labelClassName, 'block text-gray-700 font-semibold mb-1')}>
                {label}
                {internalLabel && required ? <span className="text-blue-primary align-super">*</span> : ' '}
                {internalLabel && optional ? (
                  <span className="text-xs font-normal text-gray-600">(optional)</span>
                ) : (
                  ' '
                )}
              </label>
            )}
            <div className="relative inline-block w-full">
              {!!icon && (
                <div className="absolute z-10 mx-3 flex h-full items-center text-gray-300">
                  <FontAwesomeIcon icon={icon} size="lg" />
                </div>
              )}

              <input
                name={fieldName || name}
                onFocus={(): void => setFocused(true)}
                onBlur={(e): void => {
                  setFocused(false)
                  handleBlur(e)
                }}
                onChange={(e): void => onChange(e)}
                autoComplete={autoComplete}
                id={id}
                ref={inputRef}
                type={inputType}
                className={classNames(
                  inputClassName,
                  `w-full relative text-lg ${error ? 'border-red-600' : 'border-gray-200'} ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  } rounded-md focus:border-blue-600  focus:ring-blue-600 focus:ring-1  focus:outline-none w-full hover:border-blue-primary`
                )}
                value={value}
                disabled={disabled}
                checked={!!value}
                placeholder={placeholder || `Enter your ${label}`}
                data-testid={testId}
                readOnly={readOnly}
              />

              {showHighlightStrip && focused && (
                <span className="absolute inset-0 h-full w-2 rounded-l-md bg-blue-600" />
              )}
              {showHighlightStrip && error && <span className="absolute inset-0 h-full w-2 rounded-l-md bg-red-600" />}
              {!error && type === 'password' && (
                <button
                  className="absolute top-2.5 right-1 ml-2 text-gray-300"
                  type="button"
                  onClick={(): void => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
              {withCross && <Cross className="absolute top-2 right-2 ml-2 text-red-600" />}
              {withTick && (
                <Tick
                  className={`absolute ml-2 text-blue-600 ${type === 'password' ? 'right-8' : 'right-2'} top-2`}
                />
              )}
              <p className={`${error ? 'absolute -bottom-6' : 'hidden'} mt-2 ml-1 text-base font-normal text-red-600`}>
                {getIn(errors, name)}
              </p>
            </div>
          </div>
        )
      }}
    </Field>
  )
}
