import * as Yup from 'yup'
import moment from 'moment'
import { weekdays, weekends } from './Days'
const hoursErrorMessage = 'Please provide a number of hours for the session'
const greaterThanZeroErrorMessage = 'Please provide a rate greater than 0'
const weekdayRateErrorMessage = 'Please provide a rate for the weekdays'
const weekendRateErrorMessage = 'Please provide a rate for the weekend'

export const validationSchema = Yup.object().shape({
  startDate: Yup.date().label('Start date').required('Please provide a start date'),
  frequency: Yup.string().label('Please select a frequency').required('Please provide a Booking frequency'),
  interval: Yup.number()
    .when('frequency', {
      is: (val: string) => val == 'Monthly',
      then: Yup.number().label('Every month(s)').min(1, 'Please provide the number of months'),
    })
    .when('frequency', {
      is: (val: string) => val == 'Weekly',
      then: Yup.number().label('Every week(s)').min(1, 'Please provide the number of weeks'),
    }),
  customFrequency: Yup.string()
    .nullable()
    .when('frequency', {
      is: (val: string) => val == 'Monthly',
      then: Yup.string().required('Please select the monthly frequency'),
    }),
  byMonthDay: Yup.string()
    .nullable()
    .when('customFrequency', {
      is: (val: string) => val == 'OnDay',
      then: Yup.string().required('Please select the day of the month'),
    }),
  byDayPos: Yup.string()
    .nullable()
    .when('customFrequency', {
      is: (val: string) => val == 'OnThe',
      then: Yup.string().required('Please pick a day'),
    }),
  byDay: Yup.string()
    .nullable()
    .when('customFrequency', {
      is: (val: string) => val == 'OnThe',
      then: Yup.string().required('Please pick a  day'),
    }),
  counter: Yup.number()
    .nullable()
    .when('frequencySelectorEnd', {
      is: (val: string) => val == 'After',
      then: Yup.number().label('Appointments').min(1, 'Please provide the number of appointments'),
    }),
  endDate: Yup.string()
    .nullable()
    .when('frequencySelectorEnd', {
      is: (val: string) => val == 'OnDate',
      then: Yup.string().label('End date').required('Please provide an end date'),
    })
    .test({
      name: 'End date must be after start date',
      test: function (value) {
        if (!!value && !moment(value).isSameOrAfter(this.parent.startDate)) {
          return this.createError({
            message: 'End date must be after start date',
          })
        }
        return true
      },
    }),
  whichDays: Yup.array()
    .nullable()
    .when('frequency', {
      is: (val: string) => val == 'Weekly',
      then: Yup.array().label('Which days').min(1, 'Please select the day(s)'),
    }),
  hoursPerSession: Yup.number()
    .min(1, hoursErrorMessage)
    .nullable()
    .transform((value) => {
      return Number.isNaN(value) ? 0 : value
    })
    .required(),
  weekdayRate: Yup.number()
    .label('weekday rate')
    .nullable(true)
    .transform((value) => {
      return Number.isNaN(value) ? 0 : value
    })
    .when('whichDays', {
      is: (val: string[]) => {
        return val.some((day) => weekdays.includes(day))
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekdayRateErrorMessage),
    })
    .when('startDate', {
      is: (val: Date) => {
        return weekdays.includes(moment(val).format('dd').toUpperCase())
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekdayRateErrorMessage),
    })
    .when('customFrequency', {
      is: (val: string) => {
        return val === 'OnDay'
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekendRateErrorMessage),
    })
    .when('byDay', {
      is: (val: string) => {
        return weekdays.includes(val)
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekdayRateErrorMessage),
    }),
  weekendRate: Yup.number()
    .label('Weekend rate')
    .nullable(true)
    .transform((value) => {
      return Number.isNaN(value) ? 0 : value
    })
    .when('whichDays', {
      is: (val: string[]) => {
        return val.some((day) => weekends.includes(day))
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekendRateErrorMessage),
    })
    .when('startDate', {
      is: (val: Date) => {
        return weekends.includes(moment(val).format('dd').toUpperCase())
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekendRateErrorMessage),
    })
    .when('customFrequency', {
      is: (val: string) => {
        return val === 'OnDay'
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekendRateErrorMessage),
    })
    .when('byDay', {
      is: (val: string) => {
        return weekends.includes(val)
      },
      then: Yup.number().min(0.01, greaterThanZeroErrorMessage).required(weekendRateErrorMessage),
    }),
})
