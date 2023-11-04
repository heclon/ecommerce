import { Button } from '@ecommerce/ui'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface RegisterLinkProps {
  name: string
  description: string
  href: string
  imgName: string
  linkText: string
  className?: string
}

interface AlternateLink {
  prompt: string
  linkText: string
  path: string
}

interface Props {
  title: string
  children: React.ReactNode
  alternateLink?: AlternateLink
}

export const LandingLink = ({ name, description, href, imgName, linkText, className }: RegisterLinkProps) => (
  <div
    className={classNames(
      'flex rounded-lg border-gray-300 border-opacity-60 border-2 py-8 md:px-14 px-10 w-70 md:w-80 flex-col justify-between text-center',
      className
    )}
  >
    <div
      style={{
        backgroundImage: `url('/img/participant/${imgName}.svg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="m-auto h-36 w-36"
    />
    <div className="my-6 flex-1">
      <p className="mb-2 font-bold">{name}</p>
      <p className="font-light">{description}</p>
    </div>
    <Link href={href}>
      <Button>
        <span className="m-auto">{linkText}</span>
      </Button>
    </Link>
  </div>
)

const LandingComponent = ({ children, title, alternateLink }: Props) => {
  return (
    <main className="p-8 md:p-20">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-col py-10 md:flex-row">{children}</div>
      {alternateLink && (
        <>
          {alternateLink.prompt}
          <Link href={alternateLink.path}>{alternateLink.linkText}</Link>
        </>
      )}
    </main>
  )
}

export default LandingComponent
