import React from 'react'
import { FormikTextInput } from '../FormikTextInput'
import { FormikTextArea } from '../FormikTextArea'
import { Label } from '../Label'
import { ImageUploader } from '../ImageUploader'

interface WrapperProps {
  labelDisplay: string
  labelId: string
  description?: string[]
  optional?: boolean
  children: JSX.Element
}

interface Item {
  name: string
  position: string
  about: string
}
interface Props {
  name: string
  item: Item
  index: number
}

export const RowWrapper = ({ children, labelId, labelDisplay, optional, description }: WrapperProps): JSX.Element => (
  <div className="my-4 flex w-full flex-col md:flex-row md:items-center">
    <div className="mb-2 sm:w-1/2 md:mb-0">
      <Label htmlFor={labelId}>
        {labelDisplay} {optional && <span className="text-sm font-normal text-gray-600">(optional)</span>}
      </Label>
      {description?.map((text: string, index: number) => (
        <p key={index} className="pt-2 text-xs text-gray-600">
          {text}
        </p>
      ))}
    </div>
    <div className="relative sm:w-1/2">{children} </div>
  </div>
)

export const TeamTab = ({ index, item, name }: Props): JSX.Element => {
  return (
    <div>
      <RowWrapper
        labelDisplay="Display Picture"
        labelId="display-picture"
        description={['Accepted file types: JPG, PNG', 'Max file size 1MB']}
      >
        <ImageUploader
          imageDetail={[]}
          name="imageUpload"
          onChange={() => {
            return
          }}
          className="rounded-full px-4"
          uploadLabel="Add / Change photo"
          imageOptions={{
            height: 250,
            width: 250,
            round: true,
          }}
          disabled={false}
          onMediaAdd={async () => {
            return {
              id: 'test',
              url: 'test',
            }
          }}
          onMediaRemove={async () => {
            return
          }}
        />
      </RowWrapper>
      <RowWrapper labelDisplay="Team member's name" labelId="name">
        <FormikTextInput
          id={`${name}.${index}`}
          name={`${name}.${index}[name]`}
          value={item.name}
          placeholder="Enter your team member's name"
        />
      </RowWrapper>
      <RowWrapper labelDisplay="Team member's position" labelId="position">
        <FormikTextInput
          id={`${name}.${index}`}
          name={`${name}.${index}[position]`}
          value={item.position}
          placeholder="Team member's position"
        />
      </RowWrapper>
      <RowWrapper labelDisplay="Team member's bio" labelId="about">
        <FormikTextArea
          id={`${name}.${index}`}
          name={`${name}.${index}[about]`}
          value={item.about}
          placeholder="Enter your team member's bio"
        />
      </RowWrapper>
    </div>
  )
}
