import Emailer from '../Emailer'

describe('Emailer', () => {
  test('sendServiceRequestInterest', async () => {
    const emailer = new Emailer()
    const response = await emailer.sendServiceRequestInterest(
      'fake-request-is',
      '11/11/2022',
      'Test Support',
      'Steve',
      'test@provider.com.au'
    )

    expect(response.originalMessage).toMatchSnapshot()
  })
})
