import React, { ReactElement } from 'react'
import { HighlightedTitle, TitleProps } from './HighlightedTitle'

export default {
  title: 'Components/Strategy/Highlighted Title',
  component: HighlightedTitle,
  argsTypes: {
    title: {
      type: 'string',
      defaultValue: 'Plan Implementation',
    },
    animated: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

export const Primary = (args: TitleProps): ReactElement => <HighlightedTitle {...args} />
