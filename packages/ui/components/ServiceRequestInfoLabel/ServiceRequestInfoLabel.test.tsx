/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './ServiceRequestInfoLabel.stories'

const { ServiceRequestInfoLabelStory } = composeStories(stories)

const serviceRequest = 'Service request'
const democlientName = 'Demo client'
const demoSupportName = 'Demo support name'
const demoLocation = 'Demo location'

describe('ServiceRequestInfoLabel', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({ observe: () => null })
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    cleanup()
  })
  it('renders the ServiceRequestInfoLabel correctly', () => {
    render(
      <ServiceRequestInfoLabelStory
        clientName={democlientName}
        supportName={demoSupportName}
        location={demoLocation}
      />
    )
    expect(screen.getByText(serviceRequest)).toBeDefined()
    expect(screen.getByTestId('support-name-label')).toBeTruthy()
  })
})
