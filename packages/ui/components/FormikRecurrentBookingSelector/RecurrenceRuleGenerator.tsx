import React, { useEffect } from 'react'
import { BookingFormValues } from '../Modal'
import { useFormikContext } from 'formik'
import moment from 'moment'
import dayjs from 'dayjs'

const generateRepeatValues = (values: BookingFormValues, rruleArray: string[]) => {
  if (values.frequency === 'Weekly' && values.whichDays?.length) {
    const byDay = `BYDAY=${values.whichDays}`
    rruleArray.push(byDay)
  }

  if (values.frequency === 'Monthly' && values.customFrequency === 'OnDay' && values.byMonthDay != undefined) {
    rruleArray.push(`BYMONTHDAY=${values.byMonthDay?.toUpperCase()}`)
  }
  if (values.frequency === 'Monthly' && values.customFrequency === 'OnThe' && values.byDay) {
    const prefixedDays = values.byDay.split(',').map((d) => `${values.byDayPos || ''}${d}`)
    const byDay = `BYDAY=${prefixedDays}`
    rruleArray.push(byDay)
  }
}

const generateEndValues = (values: BookingFormValues, rruleArray: string[]) => {
  if (values.frequencySelectorEnd === 'After' && values.counter != undefined) {
    rruleArray.push(`COUNT=${values.counter}`)
  }
  if (values.frequencySelectorEnd === 'OnDate' && values.endDate) {
    const formattedEndDate: string = moment(values.endDate, 'DD/MM/YYYY').format('YYYYMMDD')
    rruleArray.push(`UNTIL=${formattedEndDate}`)
  }
}

export const generateRRule = (values: BookingFormValues): string => {
  if (values.frequency == undefined && values.frequency != '') {
    return ''
  }
  if (values.frequency == 'OneOff') {
    return 'FREQ=DAILY;COUNT=1'
  }
  const rruleArray = [`FREQ=${values.frequency}`]
  if (values.interval) {
    rruleArray.push(`INTERVAL=${values.interval}`)
  }
  generateRepeatValues(values, rruleArray)
  generateEndValues(values, rruleArray)
  return rruleArray.join(';')
}

export const RecurrenceRuleGenerator: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<BookingFormValues>()
  useEffect(() => {
    const rrule = generateRRule(values)
    if (rrule) {
      setFieldValue('rrule', rrule)
    }
    if (values.startDate) {
      setFieldValue('dtstart', `DTSTART=${dayjs(values.startDate).format('YYYYMMDD')}`)
    }
  }, [values])
  return null
}
