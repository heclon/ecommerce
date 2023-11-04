import classNames from 'classnames'
import * as React from 'react'
import './card.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
  className?: string
  isActive?: boolean
  tag?: 'div' | 'a'
}

export const Card = React.forwardRef(
  ({ className = '', tag = 'div', isActive, children, ...props }: CardProps, ref) => {
    const cardClass = classNames({
      card: true,
      'is-active': isActive,
      [className]: !!className,
    })

    const Tag = tag

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Tag ref={ref} className={cardClass} {...props}>
        {children}
      </Tag>
    )
  }
)
