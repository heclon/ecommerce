import React, { useEffect, useState } from 'react'
import { Label } from '../Label'
import { FormikSelectInput } from '../FormikSelectInput'
import { serviceBookingFrequencies } from '../common/serviceBookingFrequencies'
import { FormikDatePicker } from '../FormikDatePicker'
import { FormikNumberInput } from '../FormikNumberInput'
import { FormikHighlightedRadioButtons } from '../FormikHighlightedRadioButtons'
import { customFrequencyOptions } from '../common/customFrequencyOptions'
import { dayOfMonth } from '../common/dayOfMonth'
import { dayOfWeekInMonth } from '../common/dayOfWeekInMonth'
import { frequencySelectorDayOptions } from '../common/frequencySelectorDayOptions'
import { FormikErrors, FormikValues, getIn } from 'formik'
import { FormikCheckboxButton } from '../FormikCheckboxButton'
import dayjs from 'dayjs'
import { ReactSelectOptions } from '../ReactSelect'
import { frequencySelectorEndOptions } from '../common/frequencySelectorEndOptions'
import { RecurrenceRuleGenerator } from './RecurrenceRuleGenerator'
import { fullWeek } from '../Modal/BookingModal/Days'
import classNames from 'classnames'
interface ComputeDailyProps {
  interval: number
}

interface ComputeMonthlyProps {
  mode: string
  interval?: number
  on: {
    day: number
  }
  onThe: {
    which: string
    day: string
  }
}

const days = [
  { label: 'Mon', value: 'MO' },
  { label: 'Tue', value: 'TU' },
  { label: 'Wed', value: 'WE' },
  { label: 'Thu', value: 'TH' },
  { label: 'Fri', value: 'FR' },
  { label: 'Sat', value: 'SA' },
  { label: 'Sun', value: 'SU' },
]

export interface OnDate {
  date: Date
}

export interface ComputeEndProps {
  mode: string
  after?: number
  count?: number
  interval?: number
  days?: string[]
  onDate?: Date
  until?: string
  on?: {
    day: Date
  }
  onThe?: {
    which: string
    day: Date
  }
}

export interface Repeat {
  frequency: string
  monthly: ComputeMonthlyProps
  weekly: ComputeEndProps
  daily: ComputeDailyProps
}

export interface RRuleProps {
  id: string
  start: OnDate
  repeat: Repeat
  end: ComputeEndProps
}

export interface RecurrenceRuleSelectorProps<TV> {
  frequency?: string
  customFrequency?: string
  frequencySelectorEnd?: string
  counter?: number
  whichDays?: string[]
  interval?: string
  rrule?: string
  onSubmit?: (values: FormikValues) => Promise<void>
  errors?: FormikErrors<TV>
  values: FormikValues
}

interface EndSelectorProps<TV> {
  values: FormikValues
  errors?: FormikErrors<TV>
}
interface FrequencySelectorProps<TV> {
  values: FormikValues
  errors?: FormikErrors<TV>
}

export const FormikRecurrentBookingSelector = <TV extends object>({
  errors,
  values,
}: RecurrenceRuleSelectorProps<TV>): JSX.Element => {
  const {
    startDate,
    byDay,
    whichDays,
    frequency,
    hoursPerSession,
    customFrequency,
    frequencySelectorEnd,
    counter,
    interval,
  } = values
  const [daysOptions, setDaysOptions] = useState<ReactSelectOptions[]>([])
  useEffect(() => {
    if (values.startDate && values.frequency) {
      const check = dayjs(values.startDate, 'DD/MM/YYYY')
      const month = check.month() + 1
      const year = check.year()
      setDaysOptions(dayOfMonth(year, month))
    }
  }, [values.frequency, values.startDate])

  // Show error if start date day does not match selected days in the reoccurring booking
  const startDay = startDate ? fullWeek[startDate?.getDay() - 1] : new Date().getDay()
  const startDayMatchesSelectedDays = whichDays?.includes(startDay) || byDay === startDay

  const StartDatePicker = () => {
    return (
      <div className="flex-1">
        <Label htmlFor="startDate">Start date</Label>
        <div className="mt-2">
          <FormikDatePicker
            id="startDate"
            name="startDate"
            testId="startDate"
            placeholder="Select a start date"
            showInitialErrors={true}
            inputClassName="h-10 w-full"
            showYearDropdown={true}
          />
        </div>
        {frequency && customFrequency !== 'OnDay' && frequency !== 'OneOff' && !startDayMatchesSelectedDays && (
          <p
            className={classNames(
              { block: !startDayMatchesSelectedDays, hidden: startDayMatchesSelectedDays },
              'text-xs text-red-600'
            )}
          >
            Please check that your start date matches your selected reoccurring days
          </p>
        )}
      </div>
    )
  }

  const HoursPerSession = () => {
    return (
      <div className="flex-1">
        <Label htmlFor="hoursPerSession">Hours per session</Label>
        <div className="mt-2">
          <FormikNumberInput
            id="hoursPerSession"
            name="hoursPerSession"
            testId="hoursPerSession"
            type="number"
            placeholder="Hours"
            inputClassName="h-10"
            value={hoursPerSession}
            showHighlightStrip={false}
            showTick={false}
            showCross={false}
            showInitialErrors={false}
            min={0}
            allowsDecimals={true}
          />
        </div>
      </div>
    )
  }

  const EndSelector = <TV extends object>({ errors }: EndSelectorProps<TV>): JSX.Element => {
    return (
      <div className="relative grid grid-cols-2 gap-2">
        {frequency !== 'OneOff' && (
          <div className="col-span-1">
            <div className="mt-4">
              <Label htmlFor="frequencySelectorEnd">Ends</Label>
            </div>
            <div className="mt-2">
              <FormikSelectInput
                id="frequencySelectorEnd"
                name="frequencySelectorEnd"
                options={frequencySelectorEndOptions}
                placeholder="Please select an end"
                aria-placeholder="Please select an end"
                disabled={false}
                isMulti={false}
                errors={errors}
              />
            </div>
          </div>
        )}
        <div className="col-span-1">
          {frequencySelectorEnd === 'After' && frequency !== 'OneOff' && (
            <>
              <div className="mt-4">
                <Label htmlFor="counter">Appointments</Label>
              </div>
              <div className="mt-2">
                <FormikNumberInput
                  id="counter"
                  name="counter"
                  testId="counter"
                  type="number"
                  placeholder=" "
                  inputClassName="h-10"
                  value={counter}
                  showHighlightStrip={false}
                  showTick={false}
                  showCross={false}
                  showInitialErrors={false}
                  allowsDecimals={false}
                  min={1}
                />
              </div>
            </>
          )}

          {(frequency === 'Monthly' || frequency === 'Weekly') && frequencySelectorEnd === 'OnDate' && (
            <div className="mt-4">
              <Label htmlFor="endDate">End date</Label>
              <div className="mt-2">
                <FormikDatePicker
                  id="endDate"
                  name="endDate"
                  testId="endDate"
                  placeholder="Select an end date"
                  showInitialErrors={false}
                  inputClassName="h-10"
                  showYearDropdown={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const FrequencySelector = <TV extends object>({ values, errors }: FrequencySelectorProps<TV>): JSX.Element => {
    return (
      <>
        <>
          <div className="relative grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <div className="mt-4">
                <Label htmlFor="frequency">Booking frequency</Label>
              </div>
              <div className="mt-2">
                <FormikSelectInput
                  id="frequency"
                  name="frequency"
                  options={serviceBookingFrequencies}
                  placeholder="Please select a frequency"
                  aria-placeholder="Please select a frequency"
                  disabled={false}
                  isMulti={false}
                  errors={errors}
                />
              </div>
            </div>

            {(frequency === 'Monthly' || frequency === 'Weekly') && (
              <div className="col-span-1">
                <div className="mt-4">
                  <Label htmlFor="interval">Every {frequency == 'Monthly' ? 'month(s)' : 'week(s)'}</Label>
                </div>
                <div className="mt-2">
                  <FormikNumberInput
                    id="interval"
                    name="interval"
                    testId="interval"
                    type="number"
                    placeholder=" "
                    inputClassName="h-10"
                    value={interval}
                    showHighlightStrip={false}
                    showTick={false}
                    showCross={false}
                    showInitialErrors={false}
                    allowsDecimals={false}
                    min={1}
                  />
                </div>
              </div>
            )}
          </div>
        </>
        {/*{values.frequency === 'OneOff' && (values.interval = '1')}*/}
        {/*If custom frequency is not Monthly clear all Monthly relevant values*/}
        {values.frequency !== 'Monthly' && (values.customFrequency = '')}
        {values.frequency !== 'Monthly' && (values.byMonthDay = '')}
        {values.frequency !== 'Monthly' && (values.bySetPos = '')}
        {values.frequency !== 'Monthly' && (values.byDay = '')}
        {/*If custom frequency is not Weekly clear weekdays*/}
        {values.frequency !== 'Weekly' && (values.whichDays = [])}
        {/*when the Monthly radio button changes, clear each other relevant values*/}
        {values.customFrequency === 'OnThe' && (values.byMonthDay = '')}
        {values.customFrequency === 'OnDay' && (values.bySetPos = '')}
        {values.customFrequency === 'OnDay' && (values.byDay = '')}
        {values.frequency == 'Monthly' && (
          <div className="">
            <FormikHighlightedRadioButtons
              disabled={false}
              name="customFrequency"
              values={values}
              item={customFrequencyOptions[0]}
              rowContentsClassName="grid grid-cols-2"
            >
              <FormikSelectInput
                id="byMonthDay"
                name="byMonthDay"
                options={daysOptions}
                placeholder="Select day"
                className="pl-20"
                errors={errors}
              />
            </FormikHighlightedRadioButtons>
            <FormikHighlightedRadioButtons
              disabled={false}
              name="customFrequency"
              values={values}
              item={customFrequencyOptions[1]}
              wrapperClassName="grid grid-cols-1"
              rowContentsClassName="grid grid-cols-4"
            >
              <FormikSelectInput
                id="byDayPos"
                name="byDayPos"
                options={dayOfWeekInMonth}
                placeholder="Select day"
                errors={errors}
              />
              <FormikSelectInput
                id="byDay"
                name="byDay"
                options={frequencySelectorDayOptions}
                placeholder="Select day"
                errors={errors}
              />
            </FormikHighlightedRadioButtons>
            <p className="mt-2 ml-1 text-xs font-semibold text-red-600">{getIn(errors, 'customFrequency')}</p>
          </div>
        )}
        {frequency == 'Weekly' && (
          <div className="mt-4">
            <Label className="my-2">Which days</Label>
            {days.map((day, index) => {
              return (
                <FormikCheckboxButton
                  id={'dayCheckBox' + index}
                  testId={'dayCheckBox' + index}
                  name={day.value}
                  label={day.label}
                  key={index}
                  wrapperClassName="h-30 m-2 w-16 rounded-md bg-blue-300"
                  arrayName="whichDays"
                />
              )
            })}
            <p
              className={classNames(
                { block: getIn(errors, 'whichDays'), hidden: !getIn(errors, 'whichDays') },
                'mt-2 ml-1 text-xs text-red-600'
              )}
            >
              {getIn(errors, 'whichDays')}
            </p>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <RecurrenceRuleGenerator />
      <div className="mt-4 flex w-full flex-col items-start justify-between gap-4 md:flex-row">
        <StartDatePicker />
        <HoursPerSession />
      </div>

      <FrequencySelector values={values} errors={errors} />
      <EndSelector values={values} errors={errors} />
    </>
  )
}
