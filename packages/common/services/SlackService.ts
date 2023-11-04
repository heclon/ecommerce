import SlackNotifyFactory, { SlackNotify } from 'slack-notify'

class SlackService {
  public client: SlackNotify
  constructor() {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) throw new Error('Slack webhook url undefined')
    this.client = SlackNotifyFactory(webhookUrl)
  }
}

export default SlackService
