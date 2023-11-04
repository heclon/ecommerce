import React, { ReactElement, useState } from 'react'
import { SingleSelect } from './SingleSelect'
import { ReactSelectOptions } from '../types'
import { GroupBase, OptionsOrGroups } from 'react-select'

export default {
  title: 'Components/Forms/ReactSelect/SingleSelect',
  component: SingleSelect,
}

export const NormalSingleSelect = (): ReactElement => {
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

  const [selected, setSelected] = useState<ReactSelectOptions | null>(null)

  return (
    <>
      <SingleSelect
        id="abn"
        options={sampleOptions}
        selected={selected}
        onChange={(newValue) => setSelected(newValue)}
        canSelectAll={true}
        placeholder="Add an option"
        label="Add an option"
        error={!!selected}
        isSearchable={false}
      />
    </>
  )
}

export const NestedSingleSelect = (): ReactElement => {
  const sampleOptions: OptionsOrGroups<ReactSelectOptions, GroupBase<ReactSelectOptions>> = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      label: 'Group 1',
      options: [
        {
          value: '2',
          label: 'Option 2',
        },

        {
          value: '3',
          label: 'Option 3',
        },
      ],
    },
    {
      label: 'Group 2',
      options: [
        {
          value: '4',
          label: 'Option 4',
        },
      ],
    },
  ]

  const [selected, setSelected] = useState<ReactSelectOptions | null>(null)

  return (
    <>
      <SingleSelect
        id="abn"
        options={sampleOptions}
        selected={selected}
        onChange={(newValue) => setSelected(newValue)}
        canSelectAll={true}
        placeholder="Add an option"
        label="Add an option"
        error={!!selected}
        isSearchable={false}
      />
    </>
  )
}

export const SearchableSingleSelect = (): ReactElement => {
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

  const [selected, setSelected] = useState<ReactSelectOptions | null>(null)

  return (
    <SingleSelect
      id="abn"
      options={sampleOptions}
      selected={selected}
      onChange={(newValue) => setSelected(newValue)}
      placeholder="Add an option"
      label="Add an option"
      error={!!selected}
      isSearchable={true}
    />
  )
}
