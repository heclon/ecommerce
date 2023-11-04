import { test } from 'playwright-test-coverage'

test.describe('ecommerceAuthenticator', () => {
  test.use({ storageState: 'loggedInStorageState.json' })
  test('user is logged in', async ({ page }) => {
    await page.goto(`/provider/invites`)
  })
})
