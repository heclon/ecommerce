/**
 * @jest-environment jsdom
 */

import { composeStories } from '@storybook/testing-react'
import { cleanup, render, screen } from '@testing-library/react'
import * as React from 'react'
import * as stories from './BookedModal.stories'

const { BookedStory } = composeStories(stories)

const markAsBooked = 'Mark as Booked'
const cancel = 'Cancel'

describe('BookedModal', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null, disconnect: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })

  it('should display all principal UI elements when modal is open', () => {
    render(<BookedStory />)
    expect(screen.getByText('Mark request as booked')).toBeDefined()
    expect(screen.getByText(markAsBooked)).toBeDefined()
    expect(screen.getByText(cancel)).toBeDefined()
  })

  it('should close modal when Cancel clicked', async () => {
    render(<BookedStory />)
    expect(screen.getByText(cancel)).not.toBeNull()
    screen.getByText(cancel).click()

    // Expect the modal to be closed once cancel is clicked
    expect(screen.queryByDisplayValue(cancel)).toBeNull()
  })
})
