import React, { FC } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { didNotGoAheadReasons } from './didNotGoAheadReasons'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Modal } from '../Modal'
import { Label } from '../../Label'
import { FormikSelectInput } from '../../FormikSelectInput'
import { FormikTextArea } from '../../FormikTextArea'
import { Button } from '../../Button'
import { Dialog } from '@headlessui/react'
import { ServiceRequestInfoLabel } from '../../ServiceRequestInfoLabel'

export enum OfferDidNotGoAheadReason {
  CouldNotContactclient = 'CouldNotContactclient',
  MismatchclientNeeds = 'MismatchclientNeeds',
  Other = 'Other',
  clientChosenDifferentProvider = 'clientChosenDifferentProvider',
  clientDidNotGoAheadWithService = 'clientDidNotGoAheadWithService',
}

export interface NotBookedModalProps {
  supportName: string
  clientName: string
  location: string | undefined | null
  isOpen: boolean
  onClose: (isOpen?: boolean) => void
  offerDidNotGoAheadReason?: OfferDidNotGoAheadReason
  reasonDescription?: string
  onSubmit: (
    offerDidNotGoAheadReason: OfferDidNotGoAheadReason | undefined,
    reasonDescription: string | undefined
  ) => Promise<void>
}

export interface NotBookedFormValues {
  offerDidNotGoAheadReason?: OfferDidNotGoAheadReason
  reasonDescription?: string
}

const validationSchema = Yup.object().shape({
  offerDidNotGoAheadReason: Yup.string().label('Select a reason').required('Please provide a reason'),
  reasonDescription: Yup.string()
    .nullable()
    .when('offerDidNotGoAheadReason', {
      is: (val: string) => val == 'Other',
      then: Yup.string().label('Let us know why').required('Please provide a short description'),
    }),
})

export const NotBookedModal: FC<NotBookedModalProps> = ({
  supportName,
  clientName,
  location,
  isOpen,
  onSubmit,
  onClose: onCloseOriginal,
}) => {
  const onClose = async () => {
    onCloseOriginal(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
        <Dialog.Title as="h3" className="mb-4 text-xl font-medium leading-6">
          Mark request as did not go ahead
          <XIcon className="float-right h-5 w-5 cursor-pointer text-gray-400 opacity-60" onClick={onClose} />
        </Dialog.Title>
        <ServiceRequestInfoLabel supportName={supportName} clientName={clientName} location={location} />
        <Formik
          enableReinitialize={true}
          initialValues={{ reasonDescription: '' }}
          onSubmit={async (values) => {
            await onSubmit(values.offerDidNotGoAheadReason, values.reasonDescription)
          }}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<NotBookedFormValues>) => {
            return (
              <Form>
                <div className="mt-4">
                  <Label htmlFor="offerDidNotGoAheadReason">Select a reason</Label>
                  <div className="mt-4">
                    <FormikSelectInput
                      id="offerDidNotGoAheadReason"
                      name="offerDidNotGoAheadReason"
                      data-testid="offerDidNotGoAheadReason"
                      options={didNotGoAheadReasons}
                      placeholder="Reason for service not going ahead"
                      aria-placeholder="Reason for service not going ahead"
                      errors={props.errors}
                    />
                  </div>
                </div>
                <div className="my-2 h-44 text-gray-700">
                  {props.values.offerDidNotGoAheadReason === 'Other' && (
                    <>
                      <Label htmlFor="reasonDescription" className="text-gray-700">
                        Let us know why
                      </Label>
                      <div className="mt-1">
                        <FormikTextArea
                          id="reasonDescription"
                          data-testid="reasonDescription"
                          name="reasonDescription"
                          aria-placeholder="Provide a short description"
                          placeholder="Provide a short description"
                          className="focus:border-blue-yourbrand-500 focus:ring-blue-yourbrand-500 block w-full appearance-none py-2 placeholder:text-gray-600 focus:outline-none sm:text-sm"
                          showInitialErrors={false}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="sm:mt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                  <Button
                    id="notBookedCancelButton"
                    data-testid="not-booked-cancel-button"
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
                    id="notBookedSubmitButton"
                    data-testid="not-booked-submit-button"
                    variant="is-primary"
                    outlined={false}
                    type="submit"
                    className="smm:mt-4 mt-5 inline-flex w-full justify-center rounded bg-blue-700 text-white sm:col-start-3"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}
