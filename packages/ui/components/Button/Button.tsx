import classNames from 'classnames'
import * as React from 'react'
import './button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'is-tiny' | 'is-small' | 'is-normal' | 'is-medium' | 'is-large'
  variant?: 'is-primary' | 'is-secondary' | 'is-danger'
  className?: string
  outlined?: boolean
  rounded?: boolean
  icon?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  size = 'is-normal',
  outlined = false,
  rounded = false,
  icon = false,
  className = '',
  variant = 'is-primary',
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const buttonClass = classNames({
    button: true,
    [size]: true,
    [variant]: true,
    'is-rounded': rounded,
    'is-icon': icon,
    'is-outlined': outlined,
    [className]: !!className,
  })

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
