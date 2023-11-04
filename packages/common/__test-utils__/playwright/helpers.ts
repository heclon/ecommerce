import { Page } from '@playwright/test'

interface PageWaitForSelectorOptions {
  state?: 'visible' | 'attached'
  strict?: boolean
  timeout?: number
}

interface ClickOptions {
  button?: 'left' | 'right' | 'middle'
  clickCount?: number
  delay?: number
  force?: boolean
  modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>
  noWaitAfter?: boolean
  position?: {
    x: number
    y: number
  }
  timeout?: number
  trial?: boolean
}

export const waitForAndClick = async (
  page: Page,
  selector: string,
  options?: PageWaitForSelectorOptions,
  clickOptions?: ClickOptions
) => {
  await (await page.waitForSelector(selector, options))?.click(clickOptions)
}

export const scrollIntoView = async (page: Page, selector: string) => {
  await page.evaluate((selector) => {
    document.querySelector(selector)?.scrollIntoView()
  }, selector)
}
