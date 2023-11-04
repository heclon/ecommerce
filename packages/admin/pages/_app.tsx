import React from 'react'
import '../scripts/wdyr'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Toaster } from 'react-hot-toast'
import ProgressBar from '@badrap/bar-of-progress'
import { UserProfile, UserProvider } from '@auth0/nextjs-auth0/client'
import { Router } from 'next/router'
import Layout from '../layouts'
import { Decimal } from 'decimal.js'
import SuperJSON from 'superjson'
import withUrqlClient from '../lib/urql/withUrqlClient'

// navigator does not exist on server side
if (typeof navigator !== 'undefined') {
  navigator?.serviceWorker?.getRegistrations()?.then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

SuperJSON.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js'
)

const progress = new ProgressBar({
  size: 2,
  color: '#9B58A3',
  className: 'bar-of-progress',
  delay: 100,
})

if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()

  // Will not work if scroll is not on <html>
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

function ecommerceAdminApp({ Component, pageProps }: AppProps<{ user: UserProfile }>): JSX.Element {
  // If you've used `withAuth`, pageProps.user can pre-populate the hook
  // if you haven't used `withAuth`, pageProps.user is undefined so the hook
  // fetches the user from the API routes
  const { user } = pageProps

  return (
    <>
      <DefaultSeo
        title="Dashboard"
        defaultTitle="Dashboard"
        titleTemplate="%s - ecommerce Admin"
        noindex={true}
        nofollow={true}
        additionalMetaTags={[
          {
            property: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
          },
        ]}
      />
      <UserProvider user={user}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </UserProvider>
    </>
  )
}

export default withUrqlClient(ecommerceAdminApp)
