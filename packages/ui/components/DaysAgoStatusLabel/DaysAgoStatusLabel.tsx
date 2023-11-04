import * as React from 'react'
import classNames from 'classnames'

const numberOfDays = (days: number): string => {
  if (days === 0) {
    return 'today'
  } else if (days === 1) {
    return 'yesterday'
  } else {
    return `${days} days ago`
  }
}

const determineStatus = (status: string) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (status) {
    case 'Booked':
      return 'Marked as booked'
    default:
      return status
  }
}

export interface StatusLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  status: string
  days: number
  className: string
}

const text = (status: string, days: number): string => {
  if (status === 'NotBooked') {
    return 'You marked this as did not go ahead.'
  }

  if (['Ignored', 'Rejected'].includes(status)) {
    return 'Has found another provider'
  }

  return `${determineStatus(status)} ${numberOfDays(days)}`
}

export const DaysAgoStatusLabel: React.FC<StatusLabelProps> = (props: StatusLabelProps) => {
  const { status, days, className } = props
  return (
    <>
      <div
        className={`${classNames(className, 'italic', {
          'font-bold text-red-400': days >= 3 && !['NotBooked', 'Ignored', 'Rejected'].includes(status),
        })}`}
      >
        {text(status, days)}
      </div>
    </>
  )
}
