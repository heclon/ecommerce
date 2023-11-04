import { formatters } from '../..'

describe('formatters', () => {
  describe('rrule', () => {
    test.each([[''], ['FREQ=DAILY;COUNT=1'], ['FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU']])(
      'rrule formatter %s',
      (rrule?: string) => {
        expect(formatters.rrule(rrule)).toMatchSnapshot()
      }
    )
  })
})
