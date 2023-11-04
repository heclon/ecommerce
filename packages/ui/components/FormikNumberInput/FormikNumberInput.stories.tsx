import React from 'react'
import { Formik } from 'formik'
import { FormikNumberInput } from './FormikNumberInput'
import { Meta } from '@storybook/react'
import * as Yup from 'yup'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
export default {
  title: 'Components/Formik/FormikNumberInput',
  component: FormikNumberInput,
} as Meta

const validationSchema = Yup.object().shape({
  integerOnlyQuantity: Yup.number().label('Integer Quantity'),
  integerPositiveOnlyQuantity: Yup.number().label('Integer Positive Quantity'),
  decimalsQuantity: Yup.number().label('Decimals Positive Quantity'),
  decimalsPositiveQuantity: Yup.number().label('Decimals Positive Quantity'),
})

export const Quantities = (): JSX.Element => (
  <div>
    <Formik
      initialValues={{
        integerQuantity: 0,
        integerPositiveQuantity: 0,
        decimalsQuantity: 0,
        decimalsPositiveQuantity: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <>
          <form onSubmit={handleSubmit}>
            <FormikNumberInput
              id="integerQuantity"
              type="integerQuantity"
              name="integerQuantity"
              internalLabel={true}
              label="Integer Quantity"
              required={true}
              placeholder="Integer Quantity"
              onChange={handleChange}
              value={values?.integerQuantity}
              className="mb-8"
              showHighlightStrip={false}
              showInitialErrors={false}
              showTick={false}
              showCross={false}
              allowsDecimals={false}
            />
            <FormikNumberInput
              id="integerPositiveQuantity"
              type="integerPositiveQuantity"
              name="integerPositiveQuantity"
              internalLabel={true}
              label="Positive Integer Quantity"
              required={true}
              placeholder="Integer Positive Quantity"
              onChange={handleChange}
              value={values?.integerPositiveQuantity}
              className="mb-8"
              showHighlightStrip={false}
              showInitialErrors={false}
              showTick={false}
              showCross={false}
              min={0}
              allowsDecimals={false}
            />
            <FormikNumberInput
              id="decimalsQuantity"
              type="decimalsQuantity"
              name="decimalsQuantity"
              internalLabel={true}
              label="Decimals Quantity"
              required={true}
              placeholder="Decimals Quantity"
              onChange={handleChange}
              value={values?.decimalsQuantity}
              className="mb-8"
              showHighlightStrip={false}
              showInitialErrors={false}
              showTick={false}
              showCross={false}
              allowsDecimals={true}
            />
            <FormikNumberInput
              id="decimalsPositiveQuantity"
              type="decimalsPositiveQuantity"
              name="decimalsPositiveQuantity"
              internalLabel={true}
              label="Positive Decimals Quantity"
              required={true}
              placeholder="Decimals Positive Quantity"
              onChange={handleChange}
              value={values?.decimalsPositiveQuantity}
              className="mb-8"
              showHighlightStrip={false}
              showInitialErrors={false}
              showTick={false}
              showCross={false}
              min={0}
              icon={faDollarSign}
              allowsDecimals={true}
            />
          </form>
          <p className="mt-8 text-lg font-semibold">Form Values</p>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
      )}
    </Formik>
  </div>
)
