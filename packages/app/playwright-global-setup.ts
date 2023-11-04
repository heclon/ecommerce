import { chromium, FullConfig, Page } from '@playwright/test'
import ecommerceAuthenticator from '__test-utils__/testing-library/auth/ecommerceAuthenticator'
import retry from 'async-retry'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'

async function globalSetup(config: FullConfig) {
  const p = 'loggedInStorageState.json'
  if (!fs.existsSync(p) || dayjs().diff(dayjs(fs.statSync(path.resolve(p)).mtime), 'minutes') > 60) {
    const { baseURL, headless } = config.projects[0].use
    const browser = await chromium.launch({
      headless,
    })
    let loginPage: Page
    await retry(
      async () => {
        loginPage = await browser.newPage({
          baseURL,
        })
        await new ecommerceAuthenticator(loginPage).login()
        await loginPage.context().storageState({ path: p })
        await loginPage.close()
      },
      {
        onRetry: (error: Error, attempt: number) => {
          console.warn('Error attempting to login', { error, attempt })
          loginPage?.close()
        },
        retries: process.env.CI ? 10 : 0,
      }
    )
    await browser.close()
  }
}

export default globalSetup
