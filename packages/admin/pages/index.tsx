import React from 'react'
import { NextSeo } from 'next-seo'

export default function Homepage(): JSX.Element {
  return (
    <>
      <NextSeo title="Dashboard" />
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
            <div className="py-4">
              Nancy to come up with a design for the dashboard
              <span role="img" aria-label="eyes">
                👀
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
