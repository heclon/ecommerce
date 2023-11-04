import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'

interface CardLabelProps {
  label: string
  key?: string
}

export const CardLabel = ({ label, key }: CardLabelProps) => {
  return (
    <span
      key={key}
      className="inline-flex items-center rounded-full bg-green-100 py-0.5 pr-2.5 pl-1 text-sm font-medium text-green-700"
    >
      <span className="mr-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-green-500">
        <CheckCircleIcon className="h-6 w-6" />
      </span>
      {label}
    </span>
  )
}
