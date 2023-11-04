/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { screen, render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import * as stories from './FormikServiceHoursAndFeesCard.stories'

const {
  ValidWeekdayHoursRates,
  ValidWeekendHoursRates,
  ValidReoccurringMonthlyOnDayHoursRates,
  ValidReoccurringWeekdayMonthlyHoursRates,
  ValidReoccurringWeekendMonthlyHoursRates,
} = composeStories(stories)

describe('FormikServiceHoursAndFeesCard', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })

  const weekdayRate = 'Weekday rate'
  const weekendRate = 'Weekend rate'
  it('only displays weekday rate input', async () => {
    render(<ValidWeekdayHoursRates />)
    expect(screen.getByText(weekdayRate)).toBeDefined()
    expect(screen.getByDisplayValue('55')).toBeDefined()
  })
  it('only displays weekend rate input', async () => {
    render(<ValidWeekendHoursRates />)
    expect(screen.getByText(weekendRate)).toBeDefined()
    expect(screen.getByDisplayValue('155')).toBeDefined()
  })
  it('displays both weekday and weekend rate input for Monthly OnDay Booking', async () => {
    render(<ValidReoccurringMonthlyOnDayHoursRates />)
    expect(screen.getByText(weekdayRate)).toBeDefined()
    expect(screen.getByText(weekendRate)).toBeDefined()
    expect(screen.getByDisplayValue('55')).toBeDefined()
    expect(screen.getByDisplayValue('155')).toBeDefined()
  })
  it('displays weekday rate input only for Monthly TheDay Weekday Booking', async () => {
    render(<ValidReoccurringWeekdayMonthlyHoursRates />)
    expect(screen.getByText(weekdayRate)).toBeDefined()
    expect(screen.getByDisplayValue('55')).toBeDefined()
  })
  it('displays weekend rate input only for Monthly TheDay Weekend Booking', async () => {
    render(<ValidReoccurringWeekendMonthlyHoursRates />)
    expect(screen.getByText(weekendRate)).toBeDefined()
    expect(screen.getByDisplayValue('155')).toBeDefined()
  })
})
