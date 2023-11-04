import React from 'react'

interface Labelled {
  value: string
  label: string
}

interface TabsProps {
  tab: Labelled
  onChange: (selectedTab: string) => void
  selectedTab: string
}

const Tab = ({ selectedTab, tab, onChange }: TabsProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`mr-8 mb-4 cursor-pointer text-xl ${
        tab.value === selectedTab ? ' border-b-4 border-purple-700 font-semibold' : ''
      }`}
      onClick={() => onChange(tab.value)}
    >
      {tab.label}
    </div>
  )
}

export default Tab
