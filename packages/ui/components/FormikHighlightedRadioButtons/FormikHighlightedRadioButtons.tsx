import React, { ReactNode } from 'react'
import { Field, FormikValues, FormikErrors } from 'formik'
import { Label } from '../Label'
import classNames from 'classnames'

export interface RadioButtonProps<TV> {
  name: string
  disabled: boolean
  errors?: FormikErrors<TV>
  values: FormikValues
  wrapperClassName?: string
  rowContentsClassName?: string
  fieldWrapperClassName?: string
  children: ReactNode
  item: { id: string; name: string }
}

export const FormikHighlightedRadioButtons = <TV extends object>({
  disabled,
  name,
  values,
  children,
  item,
  wrapperClassName = 'grid grid-cols-1',
  fieldWrapperClassName = 'flex flex-row items-center',
  rowContentsClassName = 'flex-1 flex flex-row items-start',
}: RadioButtonProps<TV>): JSX.Element => {
  const showHighlighted = values[name] == item.id
  return (
    <>
      <div className={wrapperClassName}>
        <div
          key={`radio-button-${item.id}`}
          className={classNames(
            fieldWrapperClassName,
            `${
              showHighlighted ? 'bg-blue-300' : 'bg-white'
            } p-8 rounded-md transition-all duration-.fle200 ease-in-out`
          )}
        >
          <div className={rowContentsClassName}>
            <Field
              key={item?.id}
              id={item?.id}
              data-testid={item?.id}
              type="radio"
              name={name}
              value={item?.id}
              disabled={disabled}
              className={`mr-2 h-4 w-4  border-gray-300 ${
                disabled ? 'text-gray-600 checked:bg-gray-600' : 'text-blue-600 focus:ring-blue-500'
              }`}
            />
            <Label> {item?.name} </Label>
          </div>
          <div className={'flex flex-1 flex-row items-center justify-between'}>{children}</div>
        </div>
      </div>
    </>
  )
}
