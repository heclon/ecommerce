import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import * as React from 'react'
import './modal.css'
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onClose, ...props }: ModalProps) => {
  const [open, setOpen] = useState(isOpen)

  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" {...props} static className="fixed inset-0 z-10 overflow-y-auto" open={open} onClose={onClose}>
        <div className="relative flex min-h-screen items-end justify-center bg-gray-600 bg-opacity-75 px-4 pt-4 pb-20 text-center backdrop-blur-sm transition-opacity sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100 z-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
