// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { CaptureConsole as CaptureConsoleIntegration } from '@sentry/integrations'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.RACK || 'development',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    integrations: [
      new CaptureConsoleIntegration({
        // array of methods that should be captured
        // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
        levels: ['error'],
      }),
    ],
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  })
}
