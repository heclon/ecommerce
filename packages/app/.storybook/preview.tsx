import '../styles/global.css'
import analyticsDecorator from './decorators/analyticsDecorator'
import { fakerSeedDecorator } from './decorators/fakerSeedDecorator'
import userDecorator from './decorators/userDecorator'
import toastDecorator from './decorators/toastDecorator'
import { urqlDecorator } from '@urql/storybook-addon'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { mockDateDecorator } from 'storybook-mock-date-decorator'

export const parameters = {
  options: {
    storySort: {
      order: ['Welcome', 'Components'],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  analyticsDecorator,
  userDecorator,
  mockDateDecorator,
  fakerSeedDecorator,
  urqlDecorator,
  withPropsTable,
  toastDecorator,
]
