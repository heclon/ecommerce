import Email from 'email-templates'
import { createTransport, Transporter } from 'nodemailer'
import { minify } from 'html-minifier'

export default class Emailer {
  private readonly transport: Transporter
  constructor() {
    const { MAIL_SERVICE, MAIL_AUTH_USER, MAIL_AUTH_PASSWORD } = process.env
    if (!MAIL_SERVICE || !MAIL_AUTH_USER || !MAIL_AUTH_PASSWORD)
      throw new Error('Unable to create transport for email service as credentials were not provided')
    const options = {
      service: MAIL_SERVICE,
      auth: {
        user: MAIL_AUTH_USER,
        pass: MAIL_AUTH_PASSWORD,
      },
    }
    this.transport = createTransport(options)
    this.transport.use('compile', async (mail, callback) => {
      mail.data.html = await minify(mail.data.html as string, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeTagWhitespace: true,
      })
      callback()
    })
  }

  private newEmail() {
    return new Email({
      message: {
        from: 'no-reply@providerchoice.com.au',
      },
      // Set the 'send' property to true to send emails in develop and test environments
      // send: true,
      preview: false,
      views: {
        options: {
          extension: 'lodash',
        },
      },
      transport: this.transport,
    })
  }

  async sendServiceRequestInterest(
    requestId: string,
    requestCreatedAt: string,
    supportName: string,
    participantFirstName: string,
    providerEmail: string
  ) {
    return this.newEmail().send({
      template: 'service-request-interest',
      message: {
        to: 'providers@ecommerce.com.au',
      },
      locals: {
        requestId,
        requestCreatedAt,
        supportName,
        participantFirstName,
        providerEmail,
      },
    })
  }
}
