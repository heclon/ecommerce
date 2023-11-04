import { UserProfile, UserProvider } from '@auth0/nextjs-auth0/client'
import ProgressBar from '@badrap/bar-of-progress'
import { Decimal } from 'decimal.js'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { Router, useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import SuperJSON from 'superjson'
import BookingModalContainer from '../components/provider/invites/modal/BookingModalContainer/BookingModalContainer'
import useAnalytics, { AnalyticsProvider } from '../hooks/useAnalytics'
import { OfferBookingCaptureProvider } from '../hooks/useOfferBookingCapture'
import { ServiceInvitesProvider } from '../hooks/useServiceInvites'
import Layout from '../layouts'
import '../scripts/wdyr'
import '../styles/global.css'
import withUrqlClient from '../lib/urql/withUrqlClient'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
import { compose } from 'lodash/fp'
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

declare global {
  interface Window {
    gtag: Gtag.Gtag
  }
}

function ecommerceApp({ Component, pageProps }: AppProps<{ user?: UserProfile }>): JSX.Element {
  // If you've used `withAuth`, pageProps.user can pre-populate the hook
  // if you haven't used `withAuth`, pageProps.user is undefined so the hook
  // fetches the user from the API routes
  const { user } = pageProps

  const isDev = process.env.RACK !== 'production'

  return (
    <>
      <DefaultSeo
        title="Welcome"
        defaultTitle="Welcome"
        titleTemplate="%s - ecommerce"
        dangerouslySetAllPagesToNoIndex={isDev}
        dangerouslySetAllPagesToNoFollow={isDev}
        additionalMetaTags={[
          {
            property: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
          },
        ]}
      />
      <AnalyticsProvider>
        <RouteChangeTracker />
        <UserProvider user={user}>
          <ServiceInvitesProvider>
            <OfferBookingCaptureProvider>
              <Layout {...pageProps}>
                <Component {...pageProps} />
                <Toaster />
              </Layout>
              <BookingModalContainer />
            </OfferBookingCaptureProvider>
          </ServiceInvitesProvider>
        </UserProvider>
      </AnalyticsProvider>
    </>
  )
}

const RouteChangeTracker = () => {
  const router = useRouter()
  const analytics = useAnalytics()
  const handleRouteChange = (path: string) => {
    analytics.page('', path || '', { path, referrer: document.referrer })
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return null
}

const appWithFeatureFlagging = compose(
  withUrqlClient,
  withDVCProvider({ sdkKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY || 'fake-key' })
)(ecommerceApp)

export default appWithFeatureFlagging
