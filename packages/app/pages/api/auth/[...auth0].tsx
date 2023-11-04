import { handleAuth, handleCallback, handleLogin, handleLogout, handleProfile, Session } from '@auth0/nextjs-auth0'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { NextApiRequest, NextApiResponse } from 'next'
import UserService, { addUserPermissionsToSession } from '../../../services/UserService'
import { TLSSocket } from 'tls'

dayjs.extend(utc)

const getUrls = (req: NextApiRequest) => {
  const host = req.headers['host']
  const encrypted = (req.socket as TLSSocket).encrypted
  const protocol = req.headers['x-forwarded-proto'] || (encrypted ? 'https' : 'http')
  const redirectUri = `${protocol}://${host}/api/auth/callback`
  const returnTo = `${protocol}://${host}`
  return {
    redirectUri,
    returnTo,
  }
}

export default handleAuth({
  async signup(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { email } = req.query

    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          login_hint: (email as string) || '',
          scope: 'openid profile email offline_access',
          screen_hint: 'signup', // this prompts the signup screen
        },
      })
    } catch (error) {
      console.error(error)
      res.status(error.status || 500).end(error.message)
    }
  },

  async login(req, res) {
    try {
      // Pass custom parameters to login
      const { email } = req.query
      const { redirectUri, returnTo } = getUrls(req)

      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          login_hint: (email as string) || '',
          scope: 'openid profile email offline_access',
          redirect_uri: redirectUri,
        },
        returnTo,
      })
    } catch (error) {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  },

  async profile(req, res) {
    try {
      await handleProfile(req, res, {
        // Refetch the user profile information from /userinfo and save it to the session
        refetch: true,
        afterRefetch: (req: NextApiRequest, res: NextApiResponse, session: Session) =>
          addUserPermissionsToSession(session),
      })
    } catch (error) {
      console.error(error)
      res.status(error.status || 401).end(error.message)
    }
  },

  async callback(req, res) {
    try {
      const { redirectUri } = getUrls(req)
      await handleCallback(req, res, {
        afterCallback: UserService.afterCallback,
        redirectUri,
      })
    } catch (error) {
      console.error(error)
      // Add your own custom error handling
      res.status(error.status || 400).end(error.message)
    }
  },

  async logout(req: NextApiRequest, res: NextApiResponse) {
    const { returnTo } = getUrls(req)
    try {
      await handleLogout(req, res, {
        returnTo,
      })
    } catch (error) {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  },
})
