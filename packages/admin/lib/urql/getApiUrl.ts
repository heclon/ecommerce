const getApiUrl = (): string => {
  // In the browser we just use a relative URL and everything works perfectly
  if (process.browser) return `/api`

  // Infer the deploy URL if we're in production
  const PROVIDER_URL = process.env.ADMIN_DOMAIN

  if (PROVIDER_URL) {
    // We replace https:// from the URL if it exists and add it ourselves always at the beginning as the above environment variables are not guaranteed to include it
    return `https://${PROVIDER_URL.replace(/^https?:\/\//, '')}/api`
  }

  // Finally, fallback to hard-coded URL in case nothing else works
  if (process.env.NODE_ENV === `development`) return `http://localhost:3001/api`

  return 'https://admin.ecommerce.com.au/api'
}

export default getApiUrl
