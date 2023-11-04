import { ExclamationCircleIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import * as React from 'react'
import './input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  variant?: 'is-error' | 'is-primary'
  errorIconClass?: string
  ref?: React.ForwardedRef<HTMLInputElement>
  disabled?: boolean
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ className, variant = 'is-primary', errorIconClass = '', disabled, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          className={classNames(
            className,
            `w-full relative text-lg ${variant === 'is-error' ? 'border-red-600' : 'border-gray-200'} ${
              disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            } rounded-md focus:border-blue-600  focus:ring-blue-600 focus:ring-1  focus:outline-none w-full`
          )}
          aria-invalid={variant === 'is-error'}
          ref={ref}
          disabled={disabled}
        />
        {variant === 'is-error' && (
          <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${errorIconClass}`}>
            <ExclamationCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
        )}
      </>
    )
  }
)
