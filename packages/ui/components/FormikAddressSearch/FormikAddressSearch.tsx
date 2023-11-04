/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, getIn } from 'formik'
import React from 'react'
import { Address, AddressSearch } from '../AddressSearch'
import { Cross, Tick } from '../GeneralIcons/GeneralIcons'

export interface FormikAddressSearchProps {
  name: string
  apiKey?: string
  address: Address | undefined
  placeholder?: string
  hasError?: boolean
  onSelect: (address: Address) => void
  onBlur?: () => void
  // https://developers.google.com/places/supported_types#table3
  types?: string[]
  className?: string
  disabled?: boolean
  showTick?: boolean
  showCross?: boolean
  showInitialErrors?: boolean
}

export const FormikAddressSearch = ({
  name,
  className,
  disabled,
  apiKey,
  placeholder,
  onSelect,
  showTick,
  showCross,
  showInitialErrors = false,
  types,
}: FormikAddressSearchProps): JSX.Element => {
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const { errors, touched, values } = form
        const isTouched = getIn(touched, name)
        const error = showInitialErrors || isTouched ? getIn(errors, name) : undefined
        const valid = !error
        const withTick = showTick && valid && isTouched && getIn(values, name)
        const withCross = showCross && !valid && isTouched && !getIn(values, name)
        return (
          <>
            <div className="relative">
              <AddressSearch
                {...field}
                {...form}
                apiKey={apiKey}
                onSelect={(address: Address) => {
                  onSelect(address)
                  form.setFieldValue(name || field.name, address?.addressAsString)
                }}
                initialValue={field.value}
                className={className}
                onBlur={() => form.setFieldTouched(name || field.name, true)}
                placeholder={placeholder}
                disabled={disabled}
                touchedInvalid={!valid}
                types={types}
              />

              {withCross && <Cross className="absolute top-2 right-2 ml-2 text-red-600" />}
              {withTick && <Tick className={`absolute top-2 right-2 ml-2 text-blue-600`} />}
              <p
                className={`${
                  errors.address && !!isTouched ? 'block' : 'hidden'
                } mt-1 ml-1 text-base font-normal text-red-600`}
              >
                {errors.address}
              </p>
            </div>
          </>
        )
      }}
    </Field>
  )
}
