/**
 * @group local-development
 */

import SlackService from '../SlackService'

describe('SlackService', () => {
  const { client: slack } = new SlackService()
  it('sends message to test channel', async () => {
    await slack.success('testing notification')
  })
  it('formats attachments correctly', async () => {
    await slack.success({
      text: ':wave: Testing message attachments',
      attachments: [
        {
          color: '',
          fallback: '',
          fields: [
            {
              title: 'Email',
              value: 'hello@hello.com',
              short: false,
            },
            {
              title: 'Registered As',
              value: 'Provider',
              short: false,
            },
          ],
        },
      ],
    })
  })
})
