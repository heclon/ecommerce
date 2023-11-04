const withTM = require('next-transpile-modules')(['@ecommerce/common', '@ecommerce/datamodel', '@ecommerce/ui'])
const path = require('path')

const config = {
  images: {
    domains: [
      'localhost',
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
    ADMIN_DOMAIN: process.env.ADMIN_DOMAIN,
    RACK: process.env.RACK,
  },

  webpack: (config) => {
    // graphql-upload gets imported multiple times due to module splitting
    // Hence the parse check fails in graphql-upload scalar
    // Todo: Remove this once NextJS is upgraded to v12
    const pathToGQL = path.resolve(__dirname, '../../node_modules/graphql-upload/public/index.js')
    config.resolve.alias['graphql-upload'] = pathToGQL
    return config
  },
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
