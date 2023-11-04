import { urqlDecorator } from '@urql/storybook-addon'
import '../styles/global.css'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { mockDateDecorator } from 'storybook-mock-date-decorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [withPropsTable, urqlDecorator, mockDateDecorator]
