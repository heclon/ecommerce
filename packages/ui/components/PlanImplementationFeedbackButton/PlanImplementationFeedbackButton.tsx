import React from 'react'

export interface FeedbackButtonProps {
  children: string
  onClick?: () => void
  index?: number
  selectedValue?: number
  testId?: string
}

export const PlanImplementationFeedbackButton = ({
  children,
  onClick,
  index,
  selectedValue,
  testId,
}: FeedbackButtonProps) => {
  return (
    <button
      data-testid={testId}
      id={`fb-${index}`}
      onClick={onClick}
      className={`hover:bg-pi-blue-pale mb-8 mr-8 flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border-2 p-4 text-3xl transition-all duration-200 ease-in-out hover:border-none focus:rounded-3xl md:mb-0 ${
        index && index === selectedValue && 'bg-blue-600 border-none'
      }`}
    >
      {children}
    </button>
  )
}
