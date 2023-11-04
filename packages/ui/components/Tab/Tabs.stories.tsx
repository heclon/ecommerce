import { ComponentStory, ComponentMeta } from '@storybook/react'
import * as React from 'react'
import { TabButton, TabGroup, TabList, TabPanel } from './'
import { data } from './mockTabData'

interface TabProps {
  name: string
  content: React.ReactNode
  event: () => void
}
export interface ExampleTabProps {
  tabData: TabProps[]
}
const ExampleTabs = ({ tabData }: ExampleTabProps) => {
  return (
    <div className="mt-10">
      <TabGroup defaultIndex={0}>
        {/** TAB MENU */}
        <TabList>
          {tabData.map((tab: TabProps) => (
            <TabButton key={tab.name}>{tab.name}</TabButton>
          ))}
        </TabList>
        {tabData.map((tab: TabProps) => (
          <TabPanel key={tab.name}>{tab.content}</TabPanel>
        ))}
      </TabGroup>
    </div>
  )
}

export default {
  title: 'Components/Tabs',
  component: ExampleTabs,
} as ComponentMeta<typeof ExampleTabs>

const Template: ComponentStory<typeof ExampleTabs> = (args) => {
  return <ExampleTabs {...args} />
}

export const TabsStory = Template.bind({})
TabsStory.args = {
  tabData: data,
}
