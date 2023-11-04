import React from 'react'
import { ImageUploader, ImageUploaderProps } from './ImageUploader'

export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
}

export const SingleImageUploader = (props: ImageUploaderProps): JSX.Element => (
  <div className="flex w-24 flex-row blue-700">
    <ImageUploader
      {...props}
      name="imageUpload"
      onChange={() => {
        return
      }}
      className="rounded-full px-4 blue-700"
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
  </div>
)

export const MultiImageUploader = (props: ImageUploaderProps): JSX.Element => (
  <div className="flex w-24 blue-700">
    <ImageUploader
      {...props}
      name="imageUpload"
      onChange={() => {
        return
      }}
      isMulti={true}
      className="rounded-full px-4 blue-700"
      uploadLabel="Add / Change multiple photos"
      imageOptions={{
        height: 250,
        width: 250,
        round: true,
      }}
      disabled={false}
      onMediaAdd={async (file: Blob) => {
        return {
          id: Date.now().valueOf().toString(),
          url: URL.createObjectURL(file),
        }
      }}
      onMediaRemove={async () => {
        return
      }}
    />
  </div>
)
