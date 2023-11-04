/* eslint-disable sonarjs/cognitive-complexity */

import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Field, FieldProps, getIn } from 'formik'
import React, { CSSProperties, useRef } from 'react'
import { Cross, Tick } from '../GeneralIcons/GeneralIcons'

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
  allowsDecimals: boolean
  min?: number
}

export const FormikNumberInput = ({
  id,
  name,
  label,
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled,
  placeholder = '',
  showTick = false,
  showCross = true,
  required = false,
  testId,
  showInitialErrors = false,
  showHighlightStrip = true,
  internalLabel = true,
  icon,
  readOnly = false,
  autoComplete = 'off',
  allowsDecimals,
  min = undefined,
}: InputProps): JSX.Element => {
  const allowedKeys: string[] = []
  if (!allowsDecimals) {
    allowedKeys.push('.')
  }
  let isPositive = true
  if (min === undefined) {
    isPositive = false
    allowedKeys.push('-')
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = React.useState(false)

  return (
    <Field name={name}>
      {({ field, form }: FieldProps): React.ReactNode => {
        const { errors, setFieldValue, touched, values } = form
        const { onBlur: handleBlur, name: fieldName, value } = field
        const error = showInitialErrors || getIn(touched, name) ? getIn(errors, name) : undefined

        const valid = !error
        const withTick = showTick && valid && getIn(touched, name) && getIn(values, name)
        const withCross = showCross && !valid && getIn(touched, name) && !getIn(values, name)

        let finalValue = value
        if (isPositive) {
          finalValue = Math.max(0, value)
        }

        return (
          <div className={classNames(className, 'mb-4')}>
            {internalLabel && label && (
              <label htmlFor={id} className={classNames(labelClassName, 'block text-gray-700 font-semibold mb-1')}>
                {label}
                {internalLabel && required ? <span className="align-super text-red-600">*</span> : ' '}
              </label>
            )}
            <div className="relative inline-block w-full">
              {!!icon && (
                <div className="absolute flex h-full w-8 items-center justify-center rounded-l-md border-r-0 border-none bg-blue-200 text-gray-600 group-focus:border-y-red-400 group-focus:border-l-red-400">
                  <FontAwesomeIcon icon={icon} size="lg" />
                </div>
              )}

              <input
                id={id}
                data-testid={testId}
                name={fieldName || name}
                type="number"
                step={allowsDecimals ? '.01' : '1'}
                onFocus={(): void => setFocused(true)}
                onBlur={(e): void => {
                  setFocused(false)
                  handleBlur(e)
                }}
                onChange={(event) => {
                  setFieldValue(name, event.target.valueAsNumber)
                }}
                autoComplete={autoComplete}
                ref={inputRef}
                min={min}
                className={classNames(
                  { 'pl-12': icon },
                  inputClassName,
                  `w-full relative text-lg ${error ? 'border-red-600' : 'border-gray-200'} ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-transparent'
                  } rounded-md focus:border-blue-600  focus:ring-blue-600 focus:ring-1  focus:outline-none w-full overflow-hidden`
                )}
                value={finalValue}
                disabled={disabled}
                checked={!!value}
                placeholder={placeholder || `Enter your ${label}`}
                readOnly={readOnly}
                onKeyDown={(e) => allowedKeys.includes(e.key) && e.preventDefault()}
                onPaste={(e) => {
                  e.preventDefault()
                  return false
                }}
              />

              {showHighlightStrip && error && <span className="absolute inset-0 h-full w-2 rounded-l-md bg-red-600" />}
              {showHighlightStrip && focused && (
                <span className="absolute inset-0 h-full w-2 rounded-l-md bg-blue-600" />
              )}
              {withCross && <Cross className="absolute top-2.5 right-1 ml-2 text-red-600" />}
              {withTick && <Tick className={`absolute right-1 top-2.5 ml-2 text-blue-600`} />}
            </div>
            <p className={`${error ? 'block' : 'hidden'} mt-1 ml-1 text-base font-normal text-red-600`}>
              {getIn(errors, name)}
            </p>
          </div>
        )
      }}
    </Field>
  )
}
