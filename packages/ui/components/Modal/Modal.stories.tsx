import React, { ReactElement } from 'react'
import { Modal, ModalProps } from './Modal'
import { CheckIcon } from '@heroicons/react/solid'
import { Dialog } from '@headlessui/react'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

export const Primary = (args: ModalProps): ReactElement => (
  <Modal {...args}>
    <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
            Payment successful
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste
              dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="bg-blue-yourbrand-600 hover:bg-blue-yourbrand-700 focus:ring-blue-yourbrand-500 inline-flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          onClick={() => ({})}
        >
          Deactivate
        </button>
        <button
          type="button"
          className="focus:ring-blue-yourbrand-500 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          onClick={() => ({})}
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
)
