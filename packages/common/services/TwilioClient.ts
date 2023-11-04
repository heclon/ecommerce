import { Twilio } from 'twilio'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { parsePhoneNumber } from 'awesome-phonenumber'

interface Message {
  phoneNumber: string
  message: string
  from?: string
  messagingServiceSid?: string
}

class TwilioClient {
  private client: Twilio

  constructor() {
    this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
  }

  async send(message: Message): Promise<MessageInstance | void> {
    const { phoneNumber, message: messageBody, from, messagingServiceSid } = message

    const to = parsePhoneNumber(phoneNumber, { regionCode: 'AU' })

    if (!to.valid || !to.typeIsMobile) {
      throw new Error('Skipping SMS - Invalid mobile number passed - ' + phoneNumber)
    }
    const opts = {
      from: from || 'ecommerce',
      to: to.number.e164, // Twilio only accepts phone numbers in E164 format
      body: messageBody,
      messagingServiceSid,
    }

    if (process.env.RACK === 'production') {
      console.info(`Sending SMS.
    ${JSON.stringify(opts, null, 2)}`)

      return this.client.messages.create(opts)
    }

    console.info(`Skipping sending SMS ${process.env.RACK} ${JSON.stringify(message, null, 2)}`)
  }
}

export default TwilioClient
