import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { HoursPerWeek } from '@prisma/prochoClient'

export * from './streamToBuffer'

dayjs.extend(utc)

export const parseHoursPerWeek = (hoursPerWeek: string): string => {
  switch (hoursPerWeek) {
    case HoursPerWeek.OneOff:
      return 'Just a one-off'
    case HoursPerWeek.One:
      return 'Only one'
    case HoursPerWeek.LessThanFive:
      return 'Less than 5'
    case HoursPerWeek.FiveToTen:
      return '5 to 10'
    case HoursPerWeek.MoreThanTwenty:
      return 'More than 20'
    case HoursPerWeek.TenToTwenty:
      return '10 to 20'
    default:
      return ''
  }
}
