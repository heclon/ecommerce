import React, { ReactElement } from 'react'
import { Logo } from './Logo'

export default {
  title: 'Components/Logo',
  component: Logo,
}

export const TorusVector = (): ReactElement => <Logo className="h-6 w-auto" />
