import type { PlaywrightTestConfig } from '@playwright/test'
import ms from 'ms'
import { config as dotenv } from 'dotenv-flow'
import falsey from 'falsey'
dotenv({ silent: true })

const config: PlaywrightTestConfig = {
  testMatch: /.acceptance.test.ts/,
  timeout: ms('2 minutes'),
  retries: 0,
  workers: 1,
  globalSetup: './playwright-global-setup.ts',
  use: {
    baseURL: process.env.FRONTEND_URL || 'http://localhost:3000',
    browserName: 'chromium',
    headless: !falsey(process.env.IS_ACCEPTANCE_TEST_HEADLESS),
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
}
export default config
