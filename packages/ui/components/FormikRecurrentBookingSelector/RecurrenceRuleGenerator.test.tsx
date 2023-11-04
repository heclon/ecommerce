/**
 * @jest-environment jsdom
 */

/* eslint-disable sonarjs/no-duplicate-string */

import { generateRRule } from './RecurrenceRuleGenerator'
import { BookingFormValues } from '../Modal'

describe('RecurrenceRuleGenerator', () => {
  describe('generateRRule', () => {
    test.each([
      [{}, ''],
      [{ frequency: 'OneOff' }, 'FREQ=DAILY;COUNT=1'],
      [{ frequency: 'Weekly' }, 'FREQ=Weekly'],
      [{ frequency: 'Weekly', interval: 1 }, 'FREQ=Weekly;INTERVAL=1'],
      [{ frequency: 'Weekly', whichDays: ['MO', 'TU'] }, 'FREQ=Weekly;BYDAY=MO,TU'],
      [{ frequency: 'Monthly' }, 'FREQ=Monthly'],
      [{ frequency: 'Monthly', interval: 1 }, 'FREQ=Monthly;INTERVAL=1'],
      [{ frequency: 'Monthly', customFrequency: 'OnDay' }, 'FREQ=Monthly'],
      [{ frequency: 'Monthly', customFrequency: 'OnDay', byMonthDay: '7' }, 'FREQ=Monthly;BYMONTHDAY=7'],
      [{ frequency: 'Monthly', customFrequency: 'OnThe' }, 'FREQ=Monthly'],
      [{ frequency: 'Monthly', customFrequency: 'OnThe', byDay: 'MO,TU,WED' }, 'FREQ=Monthly;BYDAY=MO,TU,WED'],
      [
        { frequency: 'Monthly', customFrequency: 'OnThe', byDay: 'MO,TU,WED', byDayPos: 1 },
        'FREQ=Monthly;BYDAY=1MO,1TU,1WED',
      ],
      [{ frequency: 'Monthly', interval: 1, frequencySelectorEnd: 'After' }, 'FREQ=Monthly;INTERVAL=1'],
      [
        { frequency: 'Monthly', interval: 1, frequencySelectorEnd: 'After', counter: 1 },
        'FREQ=Monthly;INTERVAL=1;COUNT=1',
      ],
      [{ frequency: 'Monthly', interval: 1, frequencySelectorEnd: 'OnDate' }, 'FREQ=Monthly;INTERVAL=1'],
    ])('generates expected rule %s %s', (values, expected) => {
      expect(generateRRule(values as BookingFormValues)).toEqual(expected)
    })
  })
})
