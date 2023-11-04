import type { MetricsClient, ApplicationEnvironment } from '..'

export const mockApplicationEnvironment: typeof ApplicationEnvironment = {
  staging: 'staging',
  production: 'production',
  uat: 'uat',
  demo: 'demo',
  local: 'local',
}
export const mockGetJobsCompletedTotalGaugeSet = jest.fn()
export const mockGetJobsFailedTotalSet = jest.fn()
export const mockMetricsClient: MetricsClient = {
  getJobsCompletedTotal: jest.fn(() => {
    return {
      set: mockGetJobsCompletedTotalGaugeSet,
    }
  }),
  getJobsFailedTotal: jest.fn(() => {
    return {
      set: mockGetJobsFailedTotalSet,
    }
  }),
}
