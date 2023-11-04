/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import * as stories from './FormikRecurrentBookingSelector.stories'

const { OneOffSession, WeeklyOnMonAndFriEndingAfter3Appointments, MonthlyNeverEnding, MonthlyEndingOnDate } =
  composeStories(stories)

const everyMonth = 'Every month(s)'

describe('FormikRecurrenceRuleSelector', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })

  it('One-Off Session Story is displayed correctly: StartDatePicker, FrequencySelector with OneOff, and EndSelector is not visible', async () => {
    render(<OneOffSession />)
    // react-datepicker and CustomSelect do not work well with data-testid, so had to use getByText and getByPlaceholderText
    expect(screen.getByText('Start date')).toBeDefined()
    expect(screen.getByPlaceholderText('Select a start date')).toBeDefined()
    expect(screen.getByText('Booking frequency')).toBeDefined()
    expect(screen.getByDisplayValue('OneOff')).toBeDefined()
    await expect(() => screen.findByTestId('counter')).rejects.toThrow()
    await expect(() => screen.findByTestId('interval')).rejects.toThrow()
    await expect(() => screen.findByTestId('endDate')).rejects.toThrow()
  })

  it(`Weekly On Mondays And Fridays Ending After 3 Appointments story is displayed correctly`, async () => {
    render(<WeeklyOnMonAndFriEndingAfter3Appointments />)
    expect(screen.getByText('Start date')).toBeDefined()
    expect(screen.getByPlaceholderText('Select a start date')).toBeDefined()
    expect(screen.getByDisplayValue('Weekly')).toBeDefined()
    expect(screen.getByText('Every week(s)')).toBeDefined()
    expect(screen.getByTestId('interval')).toBeDefined()
    expect(screen.getByText('Which days')).toBeDefined()
    expect(screen.getByText('Mon')).toBeDefined()
    expect(screen.getByText('Tue')).toBeDefined()
    expect(screen.getByText('Wed')).toBeDefined()
    expect(screen.getByText('Thu')).toBeDefined()
    expect(screen.getByText('Fri')).toBeDefined()
    expect(screen.getByText('Sat')).toBeDefined()
    expect(screen.getByText('Sun')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox0')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox1')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox2')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox3')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox4')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox5')).toBeDefined()
    expect(screen.getByTestId('dayCheckBox6')).toBeDefined()

    const monday = screen.getByText('Mon')
    const friday = screen.getByText('Fri')
    const days = [monday, friday]
    days.forEach((element) => {
      expect(element).toHaveClass('bg-blue-yourbrand')
    })

    expect(screen.getByText('Appointments')).toBeDefined()
    expect(screen.getByTestId('counter')).toBeDefined()
    expect(screen.getByDisplayValue('3')).toBeDefined()
  })

  describe('Monthly stories', () => {
    it('Month frequency fields are displayed as expected', () => {
      render(<MonthlyNeverEnding />)

      expect(screen.getByDisplayValue('Monthly')).toBeDefined()
      expect(screen.getByText(everyMonth)).toBeDefined()
      expect(screen.getByTestId('interval')).toBeDefined()

      expect(screen.getByTestId('OnDay')).toBeDefined()
      expect(screen.getByText('On day')).toBeDefined()

      expect(screen.getByTestId('OnThe')).toBeDefined()
      expect(screen.getByText('On the')).toBeDefined()
    })
    it(`Ending fields as Never are displayed correctly`, async () => {
      render(<MonthlyNeverEnding />)
      expect(screen.getByText('Ends')).toBeDefined()
      expect(screen.getByDisplayValue('Never')).toBeDefined()
    })
    it(`Ending On Date fields are displayed correctly`, async () => {
      render(<MonthlyEndingOnDate />)
      expect(screen.getByText('Ends')).toBeDefined()
      expect(screen.getByDisplayValue('OnDate')).toBeDefined()
      expect(screen.getByText('End date')).toBeDefined()
    })
  })
})
