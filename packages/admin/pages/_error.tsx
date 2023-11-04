import React from 'react'
import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'
import NextErrorComponent, { ErrorProps } from 'next/error'

interface MyErrorProps {
  statusCode: number
  hasGetInitialPropsRun: boolean
  err: NextPageContext['err']
}

interface ErrorInitialProps extends ErrorProps {
  hasGetInitialPropsRun?: boolean
}

const isJSFile = (path: string | undefined) => path?.endsWith('.js') ?? false

const MyError = ({ statusCode, hasGetInitialPropsRun, err }: MyErrorProps): JSX.Element => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err)
    // Flushing is not required in this case as it only happens on the client
  }

  return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async (pageContext: NextPageContext) => {
  const errorInitialProps: ErrorInitialProps = await NextErrorComponent.getInitialProps(pageContext)

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (pageContext.err) {
    Sentry.captureException(pageContext.err)

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000)

    return errorInitialProps
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  if (isJSFile(pageContext.asPath)) {
    Sentry.captureException(new Error(`_error.tsx getInitialProps missing data at path: ${pageContext.asPath}`))
  }

  await Sentry.flush(2000)

  return errorInitialProps
}

export default MyError
