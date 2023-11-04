/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './FormikDatePicker.stories'

const { Primary } = composeStories(stories)

const demoDatePicker = 'Demo DatePicker'
describe('DatePicker', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })
  it('renders the FormikDatePicker correctly', () => {
    render(<Primary id={'DEMO_ID'} label={demoDatePicker} />)
    expect(screen.getByText(demoDatePicker)).toBeDefined()
  })
})
