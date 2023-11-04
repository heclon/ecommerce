import prependHttp from 'prepend-http'

const regExp =
  /^(http:\/\/{3}www\.|https:\/\/{3}www\.|http:\/\/|https:\/\/|www)?[a-z]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.[a-z]{2, *})?(\/.)?$/

//TODO: Remove function once the migration from react-final-form to formik is completed
export function validateFixURL(values: { website: string }, errors: Record<string, string>): void {
  if (!isValidUrl(values.website)) {
    errors.website = 'Please provide a valid website'
  } else {
    values.website = prependHttp(values.website, { https: false })
  }
}

export const isValidUrl = (url: string): boolean => {
  return regExp.test(url)
}

export const fixUrl = (url: string): string => {
  const isValid = isValidUrl(url)
  return isValid ? prependHttp(url, { https: false }) : url
}
