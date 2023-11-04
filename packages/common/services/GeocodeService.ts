import { Prisma } from '@prisma/client'
import { Client } from '@googlemaps/google-maps-services-js'
import { GeocodeResult } from '@googlemaps/google-maps-services-js/dist/common'
import { GoogleMapsRateLimiter } from './RateLimiter'
import { GeocodeResponse } from '@googlemaps/google-maps-services-js/dist/geocode/geocode'

export type GeocodeInput = Prisma.XOR<{ address: string }, { place_id: string }>

export async function fetchGeocodeResults(params: GeocodeInput): Promise<GeocodeResult | undefined> {
  const client = new Client({})
  const response: GeocodeResponse = await GoogleMapsRateLimiter.Instance.schedule({ expiration: 1000 }, async () =>
    client.geocode({
      params: {
        key: process.env.NEXT_PUBLIC_GMAPS_API_KEY || '',
        ...params,
      },
    })
  )

  if (response.data.error_message) {
    throw new Error(response.data.error_message)
  }
  return response.data.results[0]
}
