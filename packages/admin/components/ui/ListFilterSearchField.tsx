import React from 'react'
import { Field } from 'react-final-form'
import { Input } from '@ecommerce/ui'

interface ListFilterSearchFieldProps {
  label: string
  name: string
}

export const ListFilterSearchField = ({ label, name }: ListFilterSearchFieldProps): JSX.Element => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <Field name={name}>
          {({ input }): JSX.Element => <Input placeholder={`Search ${label}s...`} type="text" {...input} />}
        </Field>
      </div>
    </div>
  )
}
