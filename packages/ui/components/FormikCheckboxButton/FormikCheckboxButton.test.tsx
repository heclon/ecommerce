/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './FormikCheckboxButton.stories'

const { Primary } = composeStories(stories)

describe('FormikCheckboxButton', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })
  it('displays weekdays correctly', () => {
    render(<Primary />)
    expect(screen.getByText('Mon')).toBeDefined()
    expect(screen.getByText('Tue')).toBeDefined()
    expect(screen.getByText('Wed')).toBeDefined()
    expect(screen.getByText('Thu')).toBeDefined()
    expect(screen.getByText('Fri')).toBeDefined()
    expect(screen.getByText('Sat')).toBeDefined()
    expect(screen.getByText('Sun')).toBeDefined()
  })
})
