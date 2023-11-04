import React from 'react'
import { Label } from '../../Label'
import { FormikNumberInput } from '../../FormikNumberInput'
import { FormikValues } from 'formik'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
const WeekendRateInput = ({ values }: { values: FormikValues }) => {
  return (
    <div className="mt-4">
      <Label htmlFor="weekendRate">Weekend rate</Label>
      <div className="mt-2">
        <FormikNumberInput
          id="weekendRate"
          name="weekendRate"
          testId="weekendRate"
          type="number"
          placeholder="Please enter your hourly rate"
          inputClassName="h-10"
          value={values.weekendRate}
          showHighlightStrip={false}
          showTick={false}
          showCross={false}
          showInitialErrors={false}
          min={0}
          icon={faDollarSign}
          allowsDecimals={true}
        />
      </div>
    </div>
  )
}

export default WeekendRateInput
