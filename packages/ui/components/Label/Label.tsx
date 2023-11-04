import * as React from 'react'
import './label.css'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({ required, optional, children, ...props }: LabelProps) => {
  return (
    <label {...props} className={`label ${props?.className ?? ''}`}>
      {children} {optional && <span className="font-normal italic">(optional)</span>}{' '}
      {required && <span className="asterisk text-blue-primary">*</span>}
    </label>
  )
}
