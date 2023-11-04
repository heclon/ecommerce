import { logger } from '../services/logger'
import { CloudwatchMetricClient } from './cloudwatchClient'
import { MetricsClientError } from './errors'

export const ApplicationEnvironment = {
  staging: 'staging',
  production: 'production',
  uat: 'uat',
  demo: 'demo',
  local: 'local',
} as const
export type ApplicationEnvironmentValue = typeof ApplicationEnvironment[keyof typeof ApplicationEnvironment]

const MetricNames = {
  JobsCompletedTotal: 'jobs_completed_total',
  JobsFailedTotal: 'jobs_failed_total',
} as const
type MetricsNamesValue = typeof MetricNames[keyof typeof MetricNames]

export const MetricDimensions = {
  ApplicationEnvironment: 'application_environment',
  ApplicationName: 'application_name',
  QueueName: 'queue_name',
} as const
export type MetricDimensionsValue = typeof MetricDimensions[keyof typeof MetricDimensions]

export interface Gauge {
  set(value: number): Promise<void>
}

interface CreateMetricsClientConfiguration {
  awsRegion: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
  applicationName: string
  applicationEnvironment: ApplicationEnvironmentValue
}

/**
 * This metrics client encapsulates all the metrics (names and dimensions and types) that can be reported as part of the ecommerce domain.
 *
 * It internally connected to a metrics backend, which is currently cloudwatch.
 */
export interface MetricsClient {
  getJobsCompletedTotal: (queueName: string) => Gauge
  getJobsFailedTotal: (queueName: string) => Gauge
}

/**
 * Creates a configured [MetricsClient]
 * @param applicationName name of the service
 */
export const createMetricsClient: (config: CreateMetricsClientConfiguration) => MetricsClient = ({
  applicationName,
  applicationEnvironment,
  awsRegion,
  awsAccessKeyId,
  awsSecretAccessKey,
}) => {
  const cloudwatchClient = new CloudwatchMetricClient({
    applicationName,
    baseDimensions: {
      [MetricDimensions.ApplicationEnvironment]: applicationEnvironment,
      [MetricDimensions.ApplicationName]: applicationName,
    },
    awsRegion,
    awsAccessKeyId,
    awsSecretAccessKey,
  })

  const createGauge = (metricName: MetricsNamesValue, dimensions: Partial<Record<MetricDimensionsValue, string>>) => {
    return {
      set: async (value: number) => {
        try {
          await cloudwatchClient.setGauge(metricName, value, dimensions)
          return
        } catch (error: unknown) {
          logger.error(
            `setGauge :: internal client error :: parameters(metricName=${metricName}, dimensions=${JSON.stringify(
              dimensions
            )}), value=${value}) :: `,
            error
          )
          throw new MetricsClientError(`Error setting gauge ${error}`)
        }
      },
    }
  }

  return {
    getJobsCompletedTotal: (queueName: string) =>
      createGauge(MetricNames.JobsCompletedTotal, { queue_name: queueName }),
    getJobsFailedTotal: (queueName: string) => createGauge(MetricNames.JobsFailedTotal, { queue_name: queueName }),
  }
}
