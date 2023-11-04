import React from 'react'
import { Button } from '@ecommerce/ui'
import { FormikErrors, FormikValues } from 'formik'

export interface ButtonsProps {
  errors: FormikErrors<FormikValues>
  onClose: () => void
}

export const Buttons = ({ errors, onClose }: ButtonsProps) => {
  return (
    <div className="sm:mt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
      <Button
        id="bookedCancelButton"
        data-testid="booked-cancel-button"
        variant="is-secondary"
        type="button"
        className="mt-5 inline-flex w-full justify-center py-3 text-center text-blue-700 sm:col-start-2"
        onClick={async () => {
          await onClose()
        }}
      >
        Cancel
      </Button>
      <Button
        id="bookedSubmitButton"
        data-testid="booked-submit-button"
        size="is-normal"
        variant="is-primary"
        type="submit"
        disabled={Object.keys(errors) && Object.keys(errors).length > 0}
        outlined={false}
        className="mt-5 inline-flex w-full justify-center rounded bg-blue-700 text-white sm:col-start-3"
      >
        Submit
      </Button>
    </div>
  )
}
