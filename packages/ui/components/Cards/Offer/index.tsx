import React from 'react'
import { Card } from '../Basic'

export interface OfferCardProps {
  title: string
  numberOfOffers: number
}

export const OfferCard = ({ title, numberOfOffers }: OfferCardProps) => {
  return (
    <Card tag="div" className="">
      <div className="">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl">{title}</p>
          <p className="text-blue-primary">View Request Details</p>
        </div>
        <p className="my-8 text-lg font-semibold">
          {numberOfOffers} {numberOfOffers === 1 ? 'offer' : 'offers'} received
        </p>
        <button className="bg-blue-yourbrand rounded px-6 py-2 text-white">View Offers</button>
      </div>
    </Card>
  )
}
