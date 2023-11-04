import React, { ReactElement } from 'react'
import { DaysAgoStatusLabel } from './DaysAgoStatusLabel'

export default {
  title: 'Components/Label/DaysAgoStatusLabel',
  component: DaysAgoStatusLabel,
}

export const LessThan3Days = (): ReactElement => <DaysAgoStatusLabel status={'Accepted'} days={2} className={''} />

export const ThreeOrMoreDays = (): ReactElement => <DaysAgoStatusLabel status={'Open'} days={5} className={''} />
