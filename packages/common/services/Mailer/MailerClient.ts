export interface SendEmailInput {
  emailId: number
  message: {
    _from?: string
    to: string
    sendId?: string
    replyTo?: Array<string>
    cc?: Array<string>
    bcc?: Array<string>
  }
  contactProperties?: {
    [key: string]: string
  }
  customProperties?: {
    [key: string]: string
  }
}

export interface SendResult {
  status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
  statusId: string
  sendResult?:
    | 'SENT'
    | 'IDEMPOTENT_IGNORE'
    | 'QUEUED'
    | 'IDEMPOTENT_FAIL'
    | 'THROTTLED'
    | 'EMAIL_DISABLED'
    | 'PORTAL_SUSPENDED'
    | 'INVALID_TO_ADDRESS'
    | 'BLOCKED_DOMAIN'
    | 'PREVIOUSLY_BOUNCED'
    | 'EMAIL_UNCONFIRMED'
    | 'PREVIOUS_SPAM'
    | 'PREVIOUSLY_UNSUBSCRIBED_MESSAGE'
    | 'PREVIOUSLY_UNSUBSCRIBED_PORTAL'
    | 'INVALID_FROM_ADDRESS'
    | 'CAMPAIGN_CANCELLED'
    | 'VALIDATION_FAILED'
    | 'MTA_IGNORE'
    | 'BLOCKED_ADDRESS'
    | 'PORTAL_OVER_LIMIT'
    | 'PORTAL_EXPIRED'
    | 'PORTAL_MISSING_MARKETING_SCOPE'
    | 'MISSING_TEMPLATE_PROPERTIES'
    | 'MISSING_REQUIRED_PARAMETER'
    | 'PORTAL_AUTHENTICATION_FAILURE'
    | 'MISSING_CONTENT'
    | 'CORRUPT_INPUT'
    | 'TEMPLATE_RENDER_EXCEPTION'
    | 'GRAYMAIL_SUPPRESSED'
    | 'UNCONFIGURED_SENDING_DOMAIN'
    | 'UNDELIVERABLE'
    | 'CANCELLED_ABUSE'
    | 'QUARANTINED_ADDRESS'
    | 'ADDRESS_ONLY_ACCEPTED_ON_PROD'
    | 'PORTAL_NOT_AUTHORIZED_FOR_APPLICATION'
    | 'ADDRESS_LIST_BOMBED'
    | 'ADDRESS_OPTED_OUT'
    | 'RECIPIENT_FATIGUE_SUPPRESSED'
    | 'TOO_MANY_RECIPIENTS'
    | 'PREVIOUSLY_UNSUBSCRIBED_BRAND'
    | 'NON_MARKETABLE_CONTACT'
    | 'PREVIOUSLY_UNSUBSCRIBED_BUSINESS_UNIT'
  requestedAt?: Date
  startedAt?: Date
  completedAt?: Date
  eventId?: {
    created: Date
    id: string
  }
}

export interface MailerClient {
  sendEmail(input: SendEmailInput): Promise<SendResult>
}
