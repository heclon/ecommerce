import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import moment from 'moment'

dayjs.extend(utc)
dayjs.extend(relativeTime)

export function dateFromNow(date: Date, removeSuffix = false): string {
  return dayjs.utc(date).fromNow(removeSuffix)
}

export function getDaysSinceRequestWasCreated(createdAt: string): number {
  const now = moment()
  const end = moment(createdAt)
  return Math.floor(moment.duration(now.diff(end)).asDays())
}
