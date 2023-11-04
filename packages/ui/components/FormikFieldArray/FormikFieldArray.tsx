import React from 'react'
import { FieldArray, FormikValues, FormikErrors } from 'formik'
import { Exclamation, Trash } from '../GeneralIcons'
import { Button } from '../Button'
export interface FormikFieldArrayProps<TI> {
  name: string
  values: FormikValues
  errors: FormikErrors<FormikValues>
  addItemTitle: string
  addItemSubtitle: string
  addItemButtonText: string
  removeItemButtonText: string
  withRemoveItemButtonIcon: boolean
  children: ({
    name,
    index,
    item,
    disabled,
  }: {
    name: string
    index: number
    item: TI
    disabled: boolean
  }) => React.ReactNode
  disabled: boolean
}

export const FormikFieldArray = <TI extends object>({
  name,
  values,
  errors,
  addItemTitle,
  addItemSubtitle,
  addItemButtonText,
  removeItemButtonText,
  withRemoveItemButtonIcon,
  children,
  disabled,
}: FormikFieldArrayProps<TI>): JSX.Element => {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {values[name] &&
            values[name].length > 0 &&
            values[name].map((item: TI, index: number) => (
              <div key={index} className="my-5 flex flex-col gap-y-6 rounded-lg border bg-gray-100 p-3 shadow">
                {!disabled && (
                  <div className="flex w-full items-center justify-end">
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      {removeItemButtonText && (
                        <p className={`${withRemoveItemButtonIcon ? 'mr-2' : 'mr-0'}`}>{removeItemButtonText}</p>
                      )}
                      {withRemoveItemButtonIcon && <Trash />}
                    </Button>
                  </div>
                )}
                {children({
                  name,
                  index,
                  item,
                  disabled,
                })}
              </div>
            ))}

          {errors && typeof errors[name] === 'string' && (
            <div className="mb-8 flex flex-row items-center justify-start text-xl text-red-600">
              <Exclamation width={29} height={25} /> <p className="ml-2">{errors && (errors[name] as string)}</p>
            </div>
          )}

          {!disabled && (
            <div className="inline-block gap-y-2 rounded-lg border bg-gray-100 p-6 shadow">
              <p>{addItemTitle}</p>
              <p className="pt-1 text-sm text-gray-600">{addItemSubtitle}</p>
              <div className="mt-4">
                <Button size="is-small" type="button" onClick={() => arrayHelpers.push('')}>
                  {addItemButtonText}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    />
  )
}
