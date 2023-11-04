/**
 * @jest-environment jsdom
 */

import { composeStories } from '@storybook/testing-react'
import { act, cleanup, render, screen } from '@testing-library/react'
import * as React from 'react'
import * as stories from './BookingModal.stories'

const { BookingStory } = composeStories(stories)

const submitButtonTestId = 'booked-submit-button'
const cancelButtonTestId = 'booked-cancel-button'
const addBookingDetailsText =
  'Adding booking details here will allow us to better support you with providing your clients with the best ongoing experience.'

describe('BookingModal', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null, disconnect: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })

  it('should display all principal UI elements when modal is open', () => {
    render(<BookingStory />)
    expect(screen.getByText('Booking details')).toBeDefined()
    expect(screen.getByText(addBookingDetailsText)).toBeDefined()
    expect(screen.getByText('Service request')).toBeDefined()
    expect(screen.getByTestId('support-name-label')).toBeDefined()
    expect(screen.getByText('Start date')).toBeDefined()
    expect(screen.getByText('Booking frequency')).toBeDefined()
    expect(screen.getByText('Ends')).toBeDefined()
    expect(screen.getByTestId(submitButtonTestId)).toBeDefined()
    expect(screen.getByTestId(cancelButtonTestId)).toBeDefined()
  })

  it('should close modal when Cancel clicked', async () => {
    render(<BookingStory />)
    screen.getByTestId(cancelButtonTestId).click()
    expect(screen.queryByDisplayValue(addBookingDetailsText)).toBeFalsy()
  })

  it('should prevent submit button from being clicked when the form is empty', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<BookingStory />))
    expect(screen.getByTestId(submitButtonTestId).getAttribute('disabled')).toBeDefined()
  })

  it('should close the modal when submit button is clicked', async () => {
    render(
      <BookingStory
        startDate={new Date()}
        frequency="One-Off session"
        hoursPerSession={1}
        weekdayRate={50}
        weekendRate={65}
      />
    )
    expect(screen.getByTestId(submitButtonTestId)).toBeDefined()
    screen.getByText('Submit').click()
    expect(screen.queryByDisplayValue(addBookingDetailsText)).toBeFalsy()
  })
})
