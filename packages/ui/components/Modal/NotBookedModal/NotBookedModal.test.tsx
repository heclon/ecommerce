/**
 * @jest-environment jsdom
 */

import { composeStories } from '@storybook/testing-react'
import { act, cleanup, render, screen } from '@testing-library/react'
import * as React from 'react'
import { OfferDidNotGoAheadReason } from './NotBookedModal'
import * as stories from './NotBookedModal.stories'

const { NotBookedStory } = composeStories(stories)

const cancel = 'Cancel'
const submit = 'Submit'
const markAsNotBookedText = 'Mark request as did not go ahead'

describe('NotBookedModal', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null, disconnect: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })
  it('should display all UI elements when modal is open', () => {
    render(<NotBookedStory />)
    expect(screen.getByText(markAsNotBookedText)).toBeDefined()
    expect(screen.getByText('Service request')).toBeDefined()
    expect(screen.getByText('Select a reason')).toBeDefined()
    expect(screen.getByText(cancel)).toBeDefined()
    expect(screen.getByText(submit)).toBeDefined()
  })

  it('should close modal when Cancel clicked', async () => {
    render(<NotBookedStory />)
    screen.getByText(cancel).click()
    expect(screen.queryByDisplayValue(markAsNotBookedText)).toBeFalsy()
  })

  it('should show error when the reason has not been selected and Submit is clicked', async () => {
    render(<NotBookedStory />)
    expect(screen.getByTestId('not-booked-submit-button')).toBeDefined()

    await act(async () => {
      screen.getByText(submit).click()
    })

    expect(screen.getByText('Please provide a reason')).toBeDefined()
  })

  it('should close the modal when submit is clicked with no errors', async () => {
    render(
      <NotBookedStory
        offerDidNotGoAheadReason={OfferDidNotGoAheadReason.clientDidNotGoAheadWithService}
        reasonDescription={''}
      />
    )
    screen.getByText(submit).click()
    expect(screen.queryByDisplayValue(markAsNotBookedText)).toBeFalsy()
  })
})
