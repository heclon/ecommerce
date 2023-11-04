import React from 'react'
import { Switch } from '@headlessui/react'
import { Field, FieldProps, getIn } from 'formik'

export interface FormikCheckboxButtonProps {
  id: string
  name: string
  testId?: string
  arrayName: string
  label: string
  wrapperClassName?: string
  buttonClassName?: string
  checkedClassName?: string
  uncheckedClassName?: string
  showInitialErrors?: boolean
}

export const FormikCheckboxButton = ({
  id,
  testId,
  arrayName,
  name,
  label,
  wrapperClassName = 'flex h-10 w-auto rounded-md bg-blue-300 m-2',
  buttonClassName = 'flex-1 rounded-md bg-blue-300',
  checkedClassName = 'text-white border-blue-primary bg-blue-yourbrand',
  uncheckedClassName = 'bg-white',
  showInitialErrors,
}: FormikCheckboxButtonProps) => {
  return (
    <Field name={name}>
      {({ form: { setFieldValue, errors, touched, values } }: FieldProps): React.ReactNode => {
        const checked = values[arrayName] && values[arrayName].includes(name)
        const error = showInitialErrors || getIn(touched, name) ? getIn(errors, name) : undefined
        const handleChange = (e: boolean): void => {
          if (e) {
            setFieldValue(arrayName, [...values[arrayName], name])
          } else {
            setFieldValue(
              arrayName,
              values[arrayName].filter((v: string) => v !== name)
            )
          }
        }

        return (
          <>
            <Switch
              itemID={id}
              checked={checked}
              onChange={(e) => {
                handleChange(e)
              }}
              data-testid={testId}
            >
              <div className={wrapperClassName}>
                <div className={`${buttonClassName} ${checked ? checkedClassName : uncheckedClassName}`}>{label}</div>
              </div>
            </Switch>
            <p className={`${error ? 'block' : 'hidden'} mt-2 ml-1 text-xs font-semibold text-red-600`}>
              {getIn(errors, name)}
            </p>
          </>
        )
      }}
    </Field>
  )
}
