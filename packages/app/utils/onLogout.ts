import { AnalyticsBrowser } from '@segment/analytics-next'

export const onLogout = (analytics: AnalyticsBrowser): void => {
  analytics.track('Signed Out')
  analytics.reset()
  window.location.assign('/api/auth/logout')
}
