/**
 * @group local
 */

import TwilioClient from '../TwilioClient'

describe('TwilioClient', () => {
  describe('sends an SMS', () => {
    test('to a valid mobile ', async () => {
      await new TwilioClient().send({
        message: 'Testing SMS service',
        phoneNumber: '+61433773080',
        from: 'ecommerce',
      })
    })
  })
})
