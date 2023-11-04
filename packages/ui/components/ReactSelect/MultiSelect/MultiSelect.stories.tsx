import React, { ReactElement, useState } from 'react'
import { MultiSelect } from './MultiSelect'

export default {
  title: 'Components/Forms/ReactSelect/MultiSelect',
  component: MultiSelect,
}

export const NormalMultiSelect = (): ReactElement => {
  const sampleOptions = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
    {
      value: '4',
      label: 'Option 4',
    },
  ]

  const [selected, setSelected] = useState<string[]>([])
  return (
    <>
      <MultiSelect
        options={sampleOptions}
        selected={selected}
        onChange={setSelected}
        canSelectAll={true}
        placeholder="Add an option"
        label="Add an option"
        error={selected?.length === 0}
      />
    </>
  )
}

export const NestedMultiSelect = (): ReactElement => {
  const sampleOptions = [
    {
      label: 'Group1',
      options: [
        {
          value: '1',
          label: 'Option 1',
        },
        {
          value: '2',
          label: 'Option 2',
        },
      ],
    },
    {
      label: 'Group 2',
      options: [
        {
          value: '3',
          label: 'Option 3',
        },
        {
          value: '4',
          label: 'Option 4',
        },
      ],
    },
  ]

  const [selected, setSelected] = useState<string[]>([])
  return (
    <>
      <MultiSelect
        options={sampleOptions}
        selected={selected}
        onChange={setSelected}
        canSelectAll={true}
        placeholder="Add an option"
        label="Add an option"
        error={selected?.length === 0}
      />
    </>
  )
}

export const SearchableMultiSelect = (): ReactElement => {
  const sampleOptions = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
    {
      value: '4',
      label: 'Option 4',
    },
    {
      value: '5',
      label: 'Option 5',
    },
    {
      value: '6',
      label: 'Option 6',
    },
  ]

  const [selected, setSelected] = useState<string[]>([])

  return (
    <MultiSelect
      options={sampleOptions}
      selected={selected}
      onChange={setSelected}
      placeholder="Add an option"
      label="Add an option"
      error={selected?.length === 0}
      isSearchable={true}
    />
  )
}

export const SearchableNestedMultiSelect = (): ReactElement => {
  const sampleOptions = [
    {
      label: 'Group1',
      options: [
        {
          value: '1',
          label: 'Option 1',
        },
        {
          value: '2',
          label: 'Option 2',
        },
      ],
    },
    {
      label: 'Group 2',
      options: [
        {
          value: '3',
          label: 'Option 3',
        },
        {
          value: '4',
          label: 'Option 4',
        },
      ],
    },
  ]

  const [selected, setSelected] = useState<string[]>([])

  return (
    <MultiSelect
      options={sampleOptions}
      selected={selected}
      onChange={setSelected}
      placeholder="Add an option"
      label="Add an option"
      error={selected?.length === 0}
      isSearchable={true}
    />
  )
}
