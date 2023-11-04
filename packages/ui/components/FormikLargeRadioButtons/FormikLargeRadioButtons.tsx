import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { Field, FormikValues, useFormikContext } from 'formik'
import React, { useState } from 'react'

export interface Props {
  name: string
  options: { label: string; value: string }[]
  values: FormikValues
  direction?: 'vertical' | 'horizontal'
}

export const FormikLargeRadioButtons = ({ name, options, values, direction }: Props) => {
  const formik = useFormikContext()
  const { setFieldValue, setFieldTouched } = formik
  const [selected, setSelected] = useState(values[name])
  return (
    <RadioGroup
      value={selected}
      onChange={(value: string) => {
        setFieldValue(name, value, true)
        setFieldTouched(name, true, false)
        setSelected(value)
      }}
    >
      <div className={`my-4 grid ${direction === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 gap-4 md:grid-cols-3'} `}>
        {options.map((option) => (
          <Field key={option?.value} id={option?.value} name={name} value={option?.value}>
            {() => {
              return (
                <RadioGroup.Option
                  key={option?.value}
                  value={option?.value}
                  data-testid={`RadioGroup-${name}-Option-${option.value}`}
                  className={({ active, checked }) =>
                    classNames(
                      {
                        'ring-2 ring-white ring-opacity-100 ring-offset-2 ring-offset-white': active,
                        'bg-blue-300 text-blue-primary ring-2 ring-blue-600 ring-opacity-100': checked,
                        'bg-white': !checked,
                        'mb-4': direction === 'vertical',
                      },
                      'relative flex cursor-pointer rounded-md px-4 py-4 border-2 focus:outline-none flex-1'
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-center">
                        <div className="text-lg">
                          <RadioGroup.Label
                            as="p"
                            className={`text-center font-medium  ${checked ? 'text-blue-primary' : 'text-gray-900'}`}
                          >
                            {option.label}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              )
            }}
          </Field>
        ))}
      </div>
    </RadioGroup>
  )
}
