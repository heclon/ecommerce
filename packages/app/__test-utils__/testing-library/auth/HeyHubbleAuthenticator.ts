import { User } from '@prisma/client'
import { Authenticator, UserCredentials } from '@ecommerce/common/__test-utils__/testing-library/auth'
import { Page } from '@playwright/test'
import { prisma } from '@ecommerce/common/prisma-client'
import config from '../config'

export const userConfig = config
const defaultCredentials: UserCredentials = { username: config.username, password: config.password }

class ecommerceAuthenticator implements Authenticator {
  private page: Page
  constructor(page: Page) {
    this.page = page
  }
  async ensureTestUserExists(): Promise<User> {
    const { userId, email, firstName, lastName } = config.user
    return prisma.user.upsert({
      where: { auth0Id: userId },
      create: {
        auth0Id: userId,
        email,
        firstName,
        lastName,
        providerProfile: {
          connectOrCreate: {
            where: {
              auth0Id: userId,
            },
            create: {
              states: ['WA', 'NSW'],
              completedOnboarding: true,
            },
          },
        },
      },
      update: {
        auth0Id: userId,
        firstName,
        lastName,
        providerProfile: {
          upsert: {
            create: {
              states: ['WA', 'NSW'],
              completedOnboarding: true,
            },
            update: {
              states: ['WA', 'NSW'],
              completedOnboarding: true,
            },
          },
        },
      },
    })
  }

  async login({ username, password } = defaultCredentials): Promise<void> {
    await this.ensureTestUserExists()

    const targetPath = '/provider/account/profile'

    const { page } = this
    // Try to access authenticated route whilst unauthenticated
    await page.goto(targetPath)
    // Enter and submit login credentials
    await page.type('#username', username)
    await page.type('#password', password)
    await page.locator('BUTTON[type="submit"]').click()
    // Wait for redirect back to authenticated route
    await page.waitForNavigation({ url: targetPath, waitUntil: 'load' })
  }

  async logout(): Promise<void> {
    const { page } = this
    await page.goto(`/api/auth/logout`)
    // Wait for redirect to login page
    const isUserMenuVisible = await page.isVisible('data-testid=user-menu-button', {})
    expect(isUserMenuVisible).toBeFalsy()
  }
}

export default ecommerceAuthenticator
