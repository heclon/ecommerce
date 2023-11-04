## Metrics Client

Metrics are a core part of enabling observability for services. They give a precise measure of service health over time that can be aggregated and analysed. See [Observability Wiki](https://tshirtventures.atlassian.net/wiki/spaces/EN/pages/56754177/Observability).

This client library encapsulates what kind of metrics we can report as part of ecommerce.

## Where can I find reported Metrics

Log into the [CloudWatch metrics dashboard](https://ap-southeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-2#metricsV2:graph=~()) in the correct AWS account.

**Note**:
- Metrics that haven't been published for over two weeks will not appear in the dashboard


## Gotchas

- Metrics are expensive and each combination of (namespace, dimension, metricsName) is considered a single metric. See [pricing](https://aws.amazon.com/cloudwatch/pricing/). Make sure we're only collecting what we need!
- Cloudwatch does not support deleting metrics, after the retention period is passed without any new data points, metrics in CloudWatch will automatically be deleted. We should only be charged for metrics that received a data point that month.
