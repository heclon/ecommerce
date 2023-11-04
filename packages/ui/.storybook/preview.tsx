import '../styles/tailwind.css'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { mockDateDecorator } from 'storybook-mock-date-decorator'

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  // actions: { argTypesRegex: '^on.*' },
  actions: { argTypesRegex: '^on[A-Z].*' },
  dependencies: {
    withStoriesOnly: true,
    hideEmpty: true,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [withPropsTable, mockDateDecorator]
