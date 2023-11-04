import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { labels } from './labels'
import { renderIcons } from './icons'

const Cell: React.FC = ({ children }) => (
  <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
)
const Label = ({ label }: { label: string }) => <code className="mt-4 text-center">{label}</code>

storiesOf('Components/General Icons', module).add('Icons', () => {
  return (
    <div className="grid-col-2 md:grid-col-4 grid gap-8 lg:grid-cols-8">
      {labels.map((label: string) => (
        <Cell key={label}>
          {renderIcons(label)}
          <Label label={label} />
        </Cell>
      ))}
    </div>
  )
})
