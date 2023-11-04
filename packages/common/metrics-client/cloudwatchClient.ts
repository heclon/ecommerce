import {
  CloudWatchClient,
  PutMetricDataCommand,
  MetricDatum,
  StandardUnit,
  Dimension as AwsDimension,
} from '@aws-sdk/client-cloudwatch'

const MAX_RETRY_ATTEMPTS = 10
const METRIC_NAMESPACE_PREFIX = 'tshirtventures'
const METRIC_RESOLUTION_SECONDS = 60 // Use cloudwatch standard resolution (1 minute).

type BaseDimensions = Record<string, string>

interface ClientConfiguration {
  applicationName: string
  awsRegion: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
  baseDimensions: BaseDimensions
}

export class CloudwatchMetricClient {
  private metricNamespace: string
  private baseDimensions: BaseDimensions
  private client: CloudWatchClient

  constructor(config: ClientConfiguration) {
    this.metricNamespace = `${METRIC_NAMESPACE_PREFIX}/${config.applicationName}`
    this.baseDimensions = config.baseDimensions

    this.client = new CloudWatchClient({
      region: config.awsRegion,
      maxAttempts: MAX_RETRY_ATTEMPTS,
      // TODO: adapt the loggging service to inject here
      // logger: {},
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
      },
    })
  }

  /**
   * A gauge metric has a value that can go up and down.
   * Gauges are typically used for measured values like temperatures or current memory usage, but also "counts" that can go up and down, like the number of concurrent requests.
   * */
  async setGauge(metricName: string, value: number | undefined | null, dimensions: BaseDimensions) {
    const datum: MetricDatum = {
      MetricName: metricName,
      // Zero out values to indicate a successful report
      Value: value ?? 0,
      Dimensions: this.convertDimensions({
        ...dimensions,
        ...this.baseDimensions,
      }),
      Timestamp: new Date(),
      Unit: StandardUnit.Count,
      StorageResolution: METRIC_RESOLUTION_SECONDS,
    }

    const command = new PutMetricDataCommand({
      Namespace: this.metricNamespace,
      MetricData: [datum],
    })

    return this.client.send(command)
  }

  private convertDimensions(dimensions: BaseDimensions): AwsDimension[] {
    return Object.entries(dimensions).map(([key, value]) => ({ Name: key, Value: value }))
  }
}
