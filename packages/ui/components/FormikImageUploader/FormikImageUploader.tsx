import React from 'react'
import { Field, FieldProps } from 'formik'
import { ImageUploader, ImageOptions, ImageDetail } from '../ImageUploader'
interface FormikImageUploaderProps {
  name: string
  disabled: boolean
  imageOptions?: ImageOptions
  onMediaAdd: (file: Blob) => Promise<ImageDetail>
  onMediaRemove: (mediaId: string) => Promise<void>
  isMulti?: boolean
}

export const FormikImageUploader = ({
  name,
  disabled,
  imageOptions,
  onMediaAdd,
  onMediaRemove,
  isMulti = false,
}: FormikImageUploaderProps): JSX.Element => {
  const defaultImageOptions = {
    height: 250,
    width: 250,
    round: true,
  }
  return (
    <Field name={name}>
      {({ field, form }: FieldProps): JSX.Element => {
        return (
          <ImageUploader
            {...field}
            {...form}
            name={name}
            imageDetail={field.value}
            onChange={(e): void => {
              form.setFieldValue(name, e)
              form.setFieldTouched(name, true)
            }}
            className="rounded-full"
            uploadLabel={`${field?.value?.length ? 'Change photo' : 'Add Photo'}`}
            imageOptions={imageOptions || defaultImageOptions}
            disabled={disabled}
            isMulti={isMulti}
            onMediaAdd={onMediaAdd}
            onMediaRemove={onMediaRemove}
          />
        )
      }}
    </Field>
  )
}
