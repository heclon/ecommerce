import * as React from 'react'
import { Label } from '../Label'

export interface ServiceOfferInfoLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  supportName: string
  clientName: string
  location: string | null | undefined
}

export const ServiceRequestInfoLabel: React.FC<ServiceOfferInfoLabelProps> = (props: ServiceOfferInfoLabelProps) => {
  const { supportName, clientName, location } = props
  return (
    <div className="mt-4">
      <Label htmlFor="supportName">Service request</Label>
      <div className="mt-4 flex flex-col gap-y-2 rounded-md bg-blue-300 p-4">
        <div className="flex w-full flex-row gap-1">
          <p id="supportName" data-testid="support-name-label" className="font-normal">
            {supportName} for <strong>{clientName}</strong>, {location}
          </p>
        </div>
      </div>
    </div>
  )
}
