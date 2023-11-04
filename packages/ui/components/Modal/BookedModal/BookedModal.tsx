import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Button } from '../../Button'
import { FormikSelectInput } from '../../FormikSelectInput'
import { Label } from '../../Label'
import { ServiceRequestInfoLabel } from '../../ServiceRequestInfoLabel'
import { Modal } from '../Modal'

export interface BookedModalProps {
  supportName: string
  clientName: string
  location: string | undefined | null
  isOpen: boolean
  onClose: () => void
  onClick: (values: BookedModalFormValues) => Promise<void>
}

export type BookedModalFormValues = {
  reasonDescription: string
}

export const BookedModal = (props: BookedModalProps) => {
  const { isOpen, onClose, onClick } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
        <Dialog.Title as="h3" className="mb-4 text-xl font-medium leading-6">
          Mark request as booked
          <XIcon className="float-right h-5 w-5 cursor-pointer text-gray-400 opacity-60" onClick={onClose} />
        </Dialog.Title>
        <Formik<BookedModalFormValues>
          initialValues={{ reasonDescription: '' }}
          onSubmit={onClick}
          validationSchema={Yup.object().shape({
            reasonDescription: Yup.string().required('Booking description is required'),
          })}
          isInitialValid={false}
          validateOnBlur={false}
        >
          {({ errors, isValid }) => (
            <Form>
              <p className="mt-2 font-light leading-6">
                That&apos;s great you have booked in time with the client.
              </p>
              <div className="mt-2">
                <ServiceRequestInfoLabel
                  supportName={props.supportName}
                  clientName={props.clientName}
                  location={props.location}
                />
                <div className="mt-4">
                  <Label htmlFor="reasonDescription-input">Select a reason</Label>
                  <div className="mt-4">
                    <FormikSelectInput
                      id="reasonDescription"
                      name="reasonDescription"
                      placeholder="Booking description"
                      isSearchable={false}
                      options={[
                        'An initial call has been arranged',
                        'A meet and greet has been arranged',
                        'A first booking has been made',
                        'Have agreed to multiple bookings with the client',
                      ].map((v) => ({ label: v, value: v }))}
                      errors={errors}
                      menuPortalTarget={document.body}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                <Button
                  className="mt-5 inline-flex w-full justify-center py-3 text-center text-blue-700 sm:col-start-2"
                  onClick={onClose}
                  variant="is-secondary"
                  data-testid="cancel-booked-button"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  size="is-normal"
                  variant="is-primary"
                  outlined={false}
                  type="submit"
                  className="mt-5 inline-flex w-full justify-center rounded bg-blue-700 text-white sm:col-start-3"
                  data-testid="booked-button"
                  disabled={!isValid}
                >
                  Mark as Booked
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}
