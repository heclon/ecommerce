import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

export interface PortalButtonProps
  extends Pick<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onClick' | 'type' | 'disabled'
  > {
  testId?: string
  children: ReactNode
  variant: string
  className?: string
  isValid?: boolean
  isFetching?: boolean
}

export const PortalButton = ({
  testId,
  children,
  variant,
  className,
  onClick,
  type,
  disabled,
  isFetching,
  isValid = true,
}: PortalButtonProps) => {
  return (
    <button
      data-testid={testId}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        className,
        {
          'bg-blue-yourbrand  text-white': variant === 'is-primary' && !disabled,
          'bg-gray-100  text-blue-primary': variant === 'is-secondary' && !disabled,
          'bg-blue-300 text-blue-primary cursor-not-allowed': disabled,
          'bg-blue-300 text-gray-600 cursor-not-allowed': !isValid || isFetching,
        },
        'w-full max-w-xs rounded-md px-6 py-2 flex flex-row items-center justify-center'
      )}
    >
      <FontAwesomeIcon
        icon={faRotate}
        className={`${isFetching ? 'text-blue-primary mr-2 flex animate-spin' : 'hidden'}`}
      />
      {children}
    </button>
  )
}
