import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { FormikContextType } from 'formik'

interface Props<Values> {
  children: (_context: FormikContextType<Values>) => React.ReactNode
}

const FormikChangeSubmitter = <Values extends Record<string, unknown>>({ children }: Props<Values>) => {
  const formikContext = useFormikContext<Values>()
  const { submitForm, values, initialValues } = formikContext
  const debouncedSubmit = useDebouncedCallback(async () => {
    await submitForm()
  }, 5000)
  useEffect(() => {
    values != initialValues && debouncedSubmit()
  }, [values])

  return <>{children(formikContext)}</>
}

export default FormikChangeSubmitter
