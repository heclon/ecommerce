/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import '@testing-library/jest-dom'
import * as stories from './Tabs.stories'
import { data } from './mockTabData'
const { TabsStory } = composeStories(stories)

describe('Tabs Group', () => {
  test('should render all tabs, titles, content', () => {
    render(<TabsStory />)
    data.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument()
    })
    data.forEach((tab) => {
      const tabButton = screen.getByText(tab.name)
      tabButton.click()
      expect(screen.getByText(tab.content)).toBeInTheDocument()
    })
  })
})
