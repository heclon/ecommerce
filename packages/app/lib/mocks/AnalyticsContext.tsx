import { AnalyticsBrowser } from '@segment/analytics-next'
import React from 'react'

const AnalyticsContext = React.createContext<() => AnalyticsBrowser>(undefined!)

type Props = {
  children: React.ReactNode
}
const mockAnalytics: AnalyticsBrowser = {
  trackSubmit: jest.fn().mockResolvedValue(true),
  trackClick: jest.fn().mockResolvedValue(true),
  trackLink: jest.fn().mockResolvedValue(true),
  pageView: jest.fn().mockResolvedValue(true),
  identify: jest.fn().mockResolvedValue(true),
  reset: jest.fn().mockResolvedValue(true),
  group: jest.fn().mockResolvedValue(true),
  track: jest.fn().mockResolvedValue(true),
  ready: jest.fn().mockResolvedValue(true),
  alias: jest.fn().mockResolvedValue(true),
  debug: jest.fn().mockResolvedValue(true),
  page: jest.fn().mockResolvedValue(true),
  once: jest.fn().mockResolvedValue(true),
  off: jest.fn().mockResolvedValue(true),
  on: jest.fn().mockResolvedValue(true),
  addSourceMiddleware: jest.fn().mockResolvedValue(true),
  setAnonymousId: jest.fn().mockResolvedValue(true),
  addDestinationMiddleware: jest.fn().mockResolvedValue(true),
} as unknown as AnalyticsBrowser

const AnalyticsProvider = ({ children }: Props) => (
  <AnalyticsContext.Provider value={() => mockAnalytics}>{children}</AnalyticsContext.Provider>
)

const useAnalytics = () => {
  return () => mockAnalytics
}

export { useAnalytics, AnalyticsProvider }
