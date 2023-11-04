import { getSession } from '@auth0/nextjs-auth0/edge'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  if (req.nextUrl.pathname.startsWith('/landing/login') || req.nextUrl.pathname.startsWith('/landing/signup')) {
    const session = await getSession(req, res)
    const user = session?.user
    if (!!user) {
      const sisu = req.cookies.get('sisu-path')
      const url = req.nextUrl.clone()
      if (sisu?.value == 'participant') {
        url.pathname = '/participant/relationships'
        return NextResponse.redirect(url)
      } else if (sisu?.value == 'provider') {
        url.pathname = '/provider/invites'
        return NextResponse.redirect(url)
      }
    }
  }

  if (req.nextUrl.pathname.startsWith('/participant')) {
    res.cookies.set('sisu-path', 'participant', {})
  }
  if (req.nextUrl.pathname.startsWith('/provider')) {
    res.cookies.set('sisu-path', 'provider', {})
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
