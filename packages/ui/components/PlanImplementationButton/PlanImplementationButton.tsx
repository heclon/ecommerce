import React from 'react'
import classNames from 'classnames'
export interface PIButtonProps {
  backgroundColor: string
  buttonText: string
  textColor: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}
export const PlanImplementationButton = ({
  backgroundColor,
  buttonText,
  textColor,
  onClick,
  className,
  disabled,
}: PIButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        `${backgroundColor} focus:ring-pi-blue-pale rounded-lg border border-none px-4 py-2 focus:outline-none focus:ring-2`
      )}
      disabled={disabled}
    >
      <p className={`${textColor} mb-0`}>{buttonText}</p>
    </button>
  )
}
