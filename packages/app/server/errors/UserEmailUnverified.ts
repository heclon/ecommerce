export default class UserEmailUnverifiedError extends Error {
  protected static message = 'User email not verified'
  constructor(email?: string) {
    super(`${UserEmailUnverifiedError.message}: ${email}`)
  }
}
