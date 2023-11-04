import { Field, FormikErrors, FormikValues, getIn, useFormikContext } from 'formik'
import React from 'react'
import { Cross, Tick } from '../GeneralIcons/GeneralIcons'
import CustomSelect, { CustomSelectProps, Option, ValueType } from './CustomSelect'
interface Props<Values>
  extends Pick<
    CustomSelectProps,
    'options' | 'className' | 'disabled' | 'isMulti' | 'placeholder' | 'menuPortalTarget' | 'inputId'
  > {
  id: string
  name: string
  errors?: FormikErrors<Values>
  onChange?: (option: ValueType<Option | Option[]>) => void
  showCross?: boolean
  showTick?: boolean
  showInitialErrors?: boolean
  isClearable?: boolean
  isSearchable?: boolean
}

export const FormikSelectInput = <Values extends FormikValues>({
  id,
  name,
  options,
  className,
  disabled,
  errors,
  isMulti,
  isClearable,
  isSearchable,
  placeholder,
  onChange,
  menuPortalTarget,
  showCross = true,
  showTick = false,
  showInitialErrors = false,
}: Props<Values>): JSX.Element => {
  const formik = useFormikContext()
  const { touched, values } = formik
  // Todo: Use errors from formik context instead of passing it through as a prop
  const error = showInitialErrors || getIn(touched, name) ? getIn(errors, name) : undefined
  const valid = !error
  const withTick = showTick && valid && getIn(touched, name) && getIn(values, name)
  const withCross = showCross && !valid && getIn(touched, name) && !getIn(values, name)

  return (
    <div className="relative">
      <Field
        className={className}
        name={name}
        options={options}
        component={CustomSelect}
        placeholder={placeholder || 'Select an option'}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        disabled={disabled}
        error={errors && Object.keys(errors)?.includes(name) && Object.keys(touched)?.includes(name)}
        onChange={onChange}
        id={id}
        inputId={`${id}-input`}
        instanceId={id}
        menuPortalTarget={menuPortalTarget}
      />
      {withCross && <Cross className="absolute top-2 right-14 ml-2 text-red-600" />}
      {withTick && <Tick className={`absolute right-14 top-2 ml-2 text-blue-600`} />}
      <p className={`${error ? 'block' : 'hidden'} mt-1 ml-1 text-base font-normal text-red-600`}>
        {getIn(errors, name)}
      </p>
    </div>
  )
}
