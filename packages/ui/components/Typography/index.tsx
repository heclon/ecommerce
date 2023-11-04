import classNames from 'classnames'
import React from 'react'

export interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export const Heading1 = ({ children, className }: TypographyProps) => {
  return (
    <h1 className={classNames(className, 'text-3xl font-bold leading-8 tracking-normal font-inter')}>{children}</h1>
  )
}

export const Heading2 = ({ children, className }: TypographyProps) => {
  return (
    <h2 className={classNames(className, 'text-xl font-semibold leading-6 tracking-normal font-inter}')}>{children}</h2>
  )
}

export const Paragraph = ({ children, className }: TypographyProps) => {
  return (
    <p className={classNames(className, 'text-base font-normal leading-6 tracking-normal font-inter')}>{children}</p>
  )
}

export const Small = ({ children, className }: TypographyProps) => {
  return <small className={classNames(className, 'text-xs font-normal tracking-normal leading-4')}>{children}</small>
}

export const Strong = ({ children, className }: TypographyProps) => {
  return <strong className={classNames(className, 'font-bold')}>{children}</strong>
}

export const Emphasis = ({ children, className }: TypographyProps) => {
  return <em className={classNames(className, 'italic')}>{children}</em>
}

export const ListItem = ({ children, className }: TypographyProps) => {
  return <li className={classNames(className, 'list-disc')}>{children}</li>
}
export const NumberListItem = ({ children, className }: TypographyProps) => {
  return <li className={classNames(className, 'list-decimal')}>{children}</li>
}

export const Code = ({ children, className }: TypographyProps) => {
  return (
    <code className={classNames(className, 'text-base bg-slate-200 rounded block text-left px-2')}>{children}</code>
  )
}
