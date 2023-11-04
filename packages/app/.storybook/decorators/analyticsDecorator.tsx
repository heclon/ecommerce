import React from 'react'
import { AnalyticsProvider } from '../../hooks/useAnalytics'
const analyticsDecorator = (Story) => (
  <AnalyticsProvider>
    <Story />
  </AnalyticsProvider>
)
export default analyticsDecorator
