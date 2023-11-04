import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch'
import { partialMock } from '../__test-utils__/jest-extensions'
import { createMetricsClient, CreateMetricsClientConfiguration } from './metricsClient'

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'))

jest.mock('@aws-sdk/client-cloudwatch', () => ({
  ...jest.requireActual('@aws-sdk/client-cloudwatch'),
  CloudWatchClient: jest.fn(),
}))

describe('metricsClient', () => {
  const fakeConfig: CreateMetricsClientConfiguration = {
    awsRegion: 'fake-region',
    awsAccessKeyId: 'fake-key',
    awsSecretAccessKey: 'fake-secret',
    applicationName: 'fake-name',
    applicationRack: 'staging',
  }

  const mockClientSend = jest.fn().mockResolvedValue({})
  const mockCloudwatchClient = partialMock<CloudWatchClient>({
    send: mockClientSend,
  })

  jest.mocked(CloudWatchClient).mockImplementation(() => mockCloudwatchClient)

  const awsCommandToJson = (command: PutMetricDataCommand): { input: object } => {
    return JSON.parse(JSON.stringify(command))
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('createMetricsClient should instantiate a cloudwatch client with the right configurations', async () => {
    createMetricsClient(fakeConfig)

    expect(CloudWatchClient.prototype.constructor).toHaveBeenCalledTimes(1)
    expect(CloudWatchClient.prototype.constructor).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: 'fake-key',
        secretAccessKey: 'fake-secret',
      },
      maxAttempts: 10,
      region: 'fake-region',
    })
  })

  it('setting the getJobsCompletedTotal gauge should put a metric into aws cloudwatch', async () => {
    const client = createMetricsClient(fakeConfig)
    const gauge = client.getJobsCompletedTotal('fake-queue')

    expect(gauge).toBeDefined()
    await gauge.set(100)
    expect(mockClientSend).toHaveBeenCalledTimes(1)
    expect(awsCommandToJson(mockClientSend.mock.lastCall[0]).input).toMatchInlineSnapshot(`
      Object {
        "MetricData": Array [
          Object {
            "Dimensions": Array [
              Object {
                "Name": "queue_name",
                "Value": "fake-queue",
              },
              Object {
                "Name": "application_rack",
                "Value": "staging",
              },
              Object {
                "Name": "application_name",
                "Value": "fake-name",
              },
            ],
            "MetricName": "jobs_completed_total",
            "StorageResolution": 60,
            "Timestamp": "2023-01-01T00:00:00.000Z",
            "Unit": "Count",
            "Value": 100,
          },
        ],
        "Namespace": "tshirtventures/fake-name",
      }
    `)
  })

  it('setting the getJobsFailedTotal gauge should put a metric into aws cloudwatch', async () => {
    const client = createMetricsClient(fakeConfig)
    const gauge = client.getJobsFailedTotal('fake-queue')

    expect(gauge).toBeDefined()
    await gauge.set(1)
    expect(mockClientSend).toHaveBeenCalledTimes(1)
    expect(awsCommandToJson(mockClientSend.mock.lastCall[0]).input).toMatchInlineSnapshot(`
      Object {
        "MetricData": Array [
          Object {
            "Dimensions": Array [
              Object {
                "Name": "queue_name",
                "Value": "fake-queue",
              },
              Object {
                "Name": "application_rack",
                "Value": "staging",
              },
              Object {
                "Name": "application_name",
                "Value": "fake-name",
              },
            ],
            "MetricName": "jobs_failed_total",
            "StorageResolution": 60,
            "Timestamp": "2023-01-01T00:00:00.000Z",
            "Unit": "Count",
            "Value": 1,
          },
        ],
        "Namespace": "tshirtventures/fake-name",
      }
    `)
  })
})
