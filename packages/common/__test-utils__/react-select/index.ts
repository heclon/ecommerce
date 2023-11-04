import { Page, test } from '@playwright/test'
import wait from 'waait'
import { waitForAndClick } from '../playwright/helpers'

export const selectOption = async (page: Page, select: string, option: string) => {
  await waitForAndClick(page, select)
  await page.waitForSelector(option)
  const expectedValue = await page.$eval(option, (el) => (el as HTMLInputElement).innerText)
  await wait(500)
  await waitForAndClick(page, option, { timeout: 5000 })
  const actualValue = await page.$eval(`${select} div div`, (el) => (el as HTMLElement).innerText)
  test.expect(actualValue).toContain(expectedValue)
}
