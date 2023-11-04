export default class InternalServerError extends Error {
  protected static message = 'Something went wrong'
  constructor(customError?: string) {
    if (customError) super(customError)
    else super(InternalServerError.message)
  }
}
