import { handleAuth, handleCallback, handleLogin, handleLogout } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { TLSSocket } from 'tls'

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
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { redirectUri } = getUrls(req)
      await handleCallback(req, res, { redirectUri })
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  },

  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email } = req.query
      const { redirectUri, returnTo } = getUrls(req)

      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          login_hint: (email as string) || '',
          redirect_uri: redirectUri,
          scope: 'openid profile email offline_access',
        },
        returnTo,
      })
    } catch (error) {
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
      res.status(error.status || 400).end(error.message)
    }
  },
})
