const withTM = require('next-transpile-modules')(['@ecommerce/common', '@ecommerce/datamodel', '@ecommerce/ui'])
const path = require('path')

const config = {
  images: {
    domains: [
      'ecommerce-staging.s3.ap-southeast-2.amazonaws.com',
      'ecommerce-production.s3.ap-southeast-2.amazonaws.com',
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    esmExternals: true,
  },

  env: {
    APP_DOMAIN: process.env.APP_DOMAIN,
    RACK: process.env.RACK,
    ABN_WS_URL: process.env.ABN_WS_URL,
    ABN_WS_AUTHENTICATION_GUID: process.env.ABN_WS_AUTHENTICATION_GUID,
  },

  webpack: (config) => {
    // Todo: Remove this once NextJS is upgraded to v12
    const pathToGQL = path.resolve(__dirname, '../../node_modules/graphql-upload/public/index.js')
    config.resolve.alias['graphql-upload'] = pathToGQL
    return config
  },
  redirects: async () => [
    {
      source: '/request',
      destination: `/service-request`,
      permanent: true,
    },
    {
      source: '/',
      destination: '/landing/login',
      permanent: false,
    },
    {
      source: '/account/profile',
      destination: '/provider/account/profile',
      permanent: true,
    },
    {
      source: '/invites/:id*',
      destination: '/provider/invites/:id*',
      permanent: true,
    },
    {
      source: '/invites/complete',
      destination: '/provider/invites/complete',
      permanent: true,
    },
    {
      source: '/invites/pending',
      destination: '/provider/invites/pending',
      permanent: true,
    },
    {
      source: '/onboarding/complete',
      destination: '/provider/onboarding/complete',
      permanent: true,
    },
    {
      source: '/onboarding/details',
      destination: '/provider/onboarding/details',
      permanent: true,
    },
    {
      source: '/onboarding/info',
      destination: '/provider/onboarding/info',
      permanent: true,
    },
    {
      source: '/onboarding/states',
      destination: '/provider/onboarding/states',
      permanent: true,
    },
    {
      source: '/requests/:id*',
      destination: '/provider/requests/:id*',
      permanent: true,
    },
    {
      source: '/requests/',
      destination: '/provider/requests/',
      permanent: true,
    },
    {
      source: '/shopfront/:id*',
      destination: '/provider/shopfront/:id*',
      permanent: true,
    },
    {
      source: '/participant',
      destination: '/participant/relationships',
      permanent: false,
    },
    {
      source: '/participant/onboarding',
      destination: '/participant/onboarding/account-owner',
      permanent: false,
    },
    {
      source: '/provider',
      destination: '/provider/invites',
      permanent: false,
    },
  ],
  swcMinify: true,
  eslint: {
    // We already run eslint in circleci
    ignoreDuringBuilds: true,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  dryRun: ['local', 'development'].includes(process.env.RACK || 'development'),

  silent: ['local', 'development'].includes(process.env.RACK || 'development'),

  deploy: {
    env: process.env.RACK || 'development',
  },
}

let moduleExports

if (!!process.env.RACK) {
  const { withSentryConfig } = require('@sentry/nextjs')
  moduleExports = withSentryConfig(config, sentryWebpackPluginOptions)
} else {
  moduleExports = config
}

module.exports = withTM(moduleExports)
