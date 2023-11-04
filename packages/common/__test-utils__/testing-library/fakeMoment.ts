import faker from 'faker/locale/en'
import moment from 'moment'

export const DATETIME_NO_TIMEZONE = 'YYYY-MM-DDTHH:mm:ss.SSS'
// returns the same date regardless of timezone
export default (): moment.Moment => {
  const date = faker.date.between('1950-01-01', '2020-01-01')
  const m = moment.utc(date).format(DATETIME_NO_TIMEZONE)
  return moment(m, DATETIME_NO_TIMEZONE)
}
