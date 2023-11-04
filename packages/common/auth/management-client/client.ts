import auth0 from 'auth0'

let domain: string
let audience: string

switch (process.env.RACK) {
  case 'staging':
    domain = 'ecommerce-staging.au.auth0.com'
    audience = 'https://ecommerce-staging.au.auth0.com/api/v2/'
    break
  case 'production':
    domain = 'ecommerce-prod.au.auth0.com'
    audience = 'https://ecommerce-prod.au.auth0.com/api/v2/'
    break
  default:
    domain = 'ecommerce-dev.au.auth0.com'
    audience = 'https://ecommerce-dev.au.auth0.com/api/v2/'
    break
}

/**
 * Auth0 Management Client
 */
export const managementClient = new auth0.ManagementClient({
  domain,
  audience,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID || 'UNKNOWN',
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET || 'UNKNOWN',
  scope: 'read:connections update:connections read:users create:users update:users update:users_app_metadata',
})
