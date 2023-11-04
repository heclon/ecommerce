import Link from 'next/link'
import React from 'react'
import { PortalButton } from '../../PortalButton'
import { Card } from '../Basic'
import classNames from 'classnames'
import { notGoingAheadStatus } from './notGoingAheadStatus'
import { ProviderServiceOfferStatus } from "./OfferDetailsCard.stories";

export interface OfferDetailsCardProps {
  providerName: string | null
  providerId: string | null
  description: string | null
  offerStatus: ProviderServiceOfferStatus
  handleYesClick: (offerId: string) => void
  handleNoClick: (offerId: string) => void
  offerId: string
  className?: string
  testId?: string
  isFetchingAcceptance: boolean
  isFetchingDeclined: boolean
}

export const OfferDetailsCard = ({
  providerName,
  providerId,
  offerId,
  offerStatus,
  description,
  className,
  handleYesClick,
  handleNoClick,
  testId,
  isFetchingAcceptance,
  isFetchingDeclined,
}: OfferDetailsCardProps) => {
  const showYesNoButtons = offerStatus === ProviderServiceOfferStatus.Offered

  return (
    <Card className={className} data-testid={testId}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <p className="text-left text-lg font-medium"> {providerName}</p>
          {providerId && (
            <Link href={`/provider/shopfront/${providerId}`} className="text-blue-primary ml-4 text-left">
              View provider profile
            </Link>
          )}
        </div>
        <div
          className={classNames(`rounded bg-gray-100 py-1 px-2`, {
            'text-gray-600': notGoingAheadStatus.includes(offerStatus),
            'text-blue-primary ': !notGoingAheadStatus.includes(offerStatus),
          })}
        >
          {offerStatus}
        </div>
      </div>
      <p className="mt-4 text-left">{description}</p>
      {showYesNoButtons && (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row ">
          <p className="w-full text-left text-sm md:text-right">
            Are you interested in being contacted by this provider?
          </p>
          <div className="flex w-full flex-row items-center justify-end">
            <PortalButton
              isFetching={isFetchingAcceptance}
              disabled={isFetchingAcceptance}
              variant="is-primary"
              className="mr-4 text-center"
              onClick={() => {
                return handleYesClick(offerId)
              }}
            >
              Yes
            </PortalButton>
            <PortalButton
              isFetching={isFetchingDeclined}
              disabled={isFetchingDeclined}
              variant="is-secondary"
              onClick={() => handleNoClick(offerId)}
            >
              No
            </PortalButton>
          </div>
        </div>
      )}
    </Card>
  )
}
