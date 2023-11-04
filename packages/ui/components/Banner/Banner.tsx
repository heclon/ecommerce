import React, { FC } from 'react'

export const Banner: FC = () => {
  return (
    <div
      data-testid="verify-email-banner"
      className="static top-0 flex w-full flex-row flex-wrap items-center justify-center bg-blue-600 p-4 text-white"
    >
      <p>
        Please verify your email address to complete your registration with ecommerce. If you haven’t received a
        verification email,
        <a
          href="mailto:xyz@gmail.com"
          className="ml-1 cursor-pointer underline"
        >
          contact us
        </a>
      </p>
    </div>
  )
}
