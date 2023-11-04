import React from 'react'
import './styles.css'
import classNames from 'classnames'
export interface TitleProps {
  title: string
  animated?: boolean
  className?: string
}

export const HighlightedTitle = ({ className, title = 'Strategy Implementation', animated = false }: TitleProps) => {
  const animatedStyles = classNames({ animated_highlighted_title: animated, highlighted_title: !animated })
  return <p className={classNames(animatedStyles, className)}>{title}</p>
}
