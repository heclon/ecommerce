import { rrulestr } from 'rrule'

export const rrule = (rrule?: string) => {
  try {
    if (rrule == 'FREQ=DAILY;COUNT=1') {
      return `One-off session`
    }
    return rrulestr(rrule || '').toText()
  } catch ({ message }) {
    console.warn(`Error parsing rrule
    ${rrule}
    ${message}`)
    return ''
  }
}
