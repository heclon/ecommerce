import { Field, FormikErrors, FormikValues, getIn, useFormikContext } from 'formik'
import { Cross, Tick } from '../../components/GeneralIcons'
import React from 'react'
import CustomCreatableSelect, { CustomSelectProps, Option, ValueType } from './CustomCreatableSelect'

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
}

export const FormikCreatableSelect = <Values extends FormikValues>({
  id,
  name,
  options,
  className,
  disabled,
  isMulti,
  placeholder,
  onChange,
  menuPortalTarget,
  showCross = true,
  showTick = false,
  showInitialErrors = false,
}: Props<Values>): JSX.Element => {
  const formik = useFormikContext()
  const { touched, values, errors } = formik
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
        component={CustomCreatableSelect}
        placeholder={placeholder || 'Select an option'}
        isMulti={isMulti}
        disabled={disabled}
        error={errors && Object.keys(errors)?.includes(name) && Object.keys(touched)?.includes(name)}
        onChange={onChange}
        id={id}
        inputId={`${id}-input`}
        instanceId={id}
        menuPortalTarget={menuPortalTarget}
      />
      {withCross && <Cross className="absolute top-2 right-14 ml-2 text-red-600" />}
      {withTick && <Tick className={`absolute right-20 top-2 ml-2 text-blue-600`} />}
      <p className={`${error ? 'block' : 'hidden'} mt-1 ml-1 text-base font-normal text-red-600`}>
        {getIn(errors, name)}
      </p>
    </div>
  )
}

export default FormikCreatableSelect
