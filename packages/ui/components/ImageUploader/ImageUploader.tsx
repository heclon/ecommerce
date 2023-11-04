import { XIcon } from '@heroicons/react/solid'
import Compressor from 'compressorjs'
import Image from 'next/image'
import React, { ChangeEvent, MutableRefObject, useRef, useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export interface ImageDetail {
  id: string
  url: string
}

export interface ImageUploaderProps {
  imageDetail?: ImageDetail[]
  isMulti?: boolean
  onChange?: (uploadedMedia: ImageDetail | ImageDetail[]) => void
  imageOptions?: ImageOptions
  uploadLabel: string
  name: string
  disabled: boolean
  className?: string
  onMediaAdd: (file: Blob) => Promise<ImageDetail>
  onMediaRemove: (mediaId: string) => Promise<void>
}

export enum ImageAspectRatio {
  RECTANGLE = 'rectangle',
}

export interface ImageOptions {
  width: number
  height: number
  /**
   * Max Size in MB
   * Defaults to 5MB
   */
  maxSize?: number
  round?: boolean
  imageType?: string
  /**
   * Defaults to 8
   */
  maxNumberOfImages?: number
  /**
   *  Defaults to ['image/png','image/jpeg']
   */
  acceptedFileTypes?: string[]
}

export const ImageUploader = ({
  name,
  isMulti,
  imageDetail = [],
  onChange,
  imageOptions,
  className,
  disabled,
  uploadLabel,
  onMediaAdd,
  onMediaRemove,
}: ImageUploaderProps): JSX.Element => {
  const imageInput: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const defaultAcceptedImages: string[] = imageOptions?.acceptedFileTypes || ['image/png', 'image/jpeg']
  const maxSizeForImage = (imageOptions?.maxSize && imageOptions?.maxSize * 1000000) || 5000000
  const maxNumberOfMultiImages = imageOptions?.maxNumberOfImages || 8

  const [currentImageDetails, setCurrentImageDetails] = useState<ImageDetail[]>(imageDetail)

  const uploadImage = async (file: Blob): Promise<void> => {
    const newImageDetail = await onMediaAdd(file)
    if (isMulti) {
      setCurrentImageDetails((existing) => [...existing, newImageDetail])
    } else {
      setCurrentImageDetails([newImageDetail])
    }
  }

  const unexpectedErrorMessage = 'Unexpected error'
  useEffect(() => {
    onChange && onChange(currentImageDetails)
  }, [currentImageDetails])

  useEffect(() => {
    setCurrentImageDetails(imageDetail)
  }, [imageDetail])

  const removeImage = (mediaId: string) => async () => {
    try {
      await onMediaRemove(mediaId)
      setCurrentImageDetails((existing) => existing.filter((imageDetail) => imageDetail.id !== mediaId))
      toast.success('Image Removed')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in HH App removeImage:', error.message)
      } else {
        console.log(unexpectedErrorMessage, error)
      }
      toast.error(
        `Error occurred, our team has been notified and is looking into it. \nSomething urgent? \nPlease contact us on providers@https://www.linkedin.com/in/hector-longarte/`
      )
    }
  }

  const handleSingleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) {
      return
    }

    const isFileBelowSizeLimit = file.size <= maxSizeForImage
    const isCorrectFileType = defaultAcceptedImages.includes(file.type)

    if (!isFileBelowSizeLimit) {
      toast.error(`Please upload an image smaller than ${maxSizeForImage / 1000000}MBs.`)
      return
    }
    if (!isCorrectFileType) {
      toast.error('Please upload a JPEG or PNG image.')
      return
    }

    if (currentImageDetails[0]?.id) {
      await onMediaRemove(currentImageDetails[0].id)
    }

    const id = toast.loading('Uploading image...')
    try {
      new Compressor(file, {
        width: imageOptions?.width,
        height: imageOptions?.height,
        success: async (compressedFile) =>
          uploadImage(compressedFile).then(() => toast.success('Image Uploaded', { id })),
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in HH App handleSingleImageUpload:', error.message)
      } else {
        console.log(unexpectedErrorMessage, error)
      }
    }
  }

  const handleMultiImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files?.length) {
      return
    }

    const validImages = files
      .map((file) => {
        const isFileBelowSizeLimit = file.size <= maxSizeForImage
        const isCorrectFileType = defaultAcceptedImages.includes(file.type)

        if (!isFileBelowSizeLimit) {
          toast.error(`Please upload an image smaller than ${maxSizeForImage / 1000000}MBs.`)
          return
        }

        if (!isCorrectFileType) {
          toast.error('Please upload a JPEG or PNG image.')
          return
        }
        return file
      })
      .filter(Boolean)

    const totalImageLength = files.length + currentImageDetails.length
    const isMoreThanMaxNumberOfImages = totalImageLength > maxNumberOfMultiImages

    if (isMoreThanMaxNumberOfImages) {
      toast.error(`Cannot upload more than ${maxNumberOfMultiImages} images.`)
      return
    }

    if (validImages.length === files.length) {
      const id = toast.loading('Uploading images...')
      try {
        await Promise.all(
          files.map(
            (image) =>
              new Compressor(image, {
                width: imageOptions?.width,
                height: imageOptions?.height,
                success: (compressedFile) => uploadImage(compressedFile),
              })
          )
        )
        toast.success('All images uploaded', { id })
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error in HH App handleMultiImageUpload:', error.message)
        } else {
          console.log(unexpectedErrorMessage, error)
        }
      }
    }
  }

  return (
    <div
      className={`flex w-full ${
        imageOptions?.imageType === ImageAspectRatio.RECTANGLE ? 'flex-col ' : 'flex-row items-center justify-between'
      }  `}
    >
      <div
        className={`flex flex-row flex-wrap gap-1 ${className} ${
          imageOptions?.imageType === ImageAspectRatio.RECTANGLE ? 'order-2' : ''
        }`}
      >
        {!isMulti && currentImageDetails && currentImageDetails[0]?.url && (
          <Image
            src={currentImageDetails[0].url || ''}
            alt={name}
            layout="fixed"
            height={70}
            width={imageOptions?.imageType === ImageAspectRatio.RECTANGLE ? 300 : 70}
            unoptimized={true}
            className={`${imageOptions?.round ? 'rounded-full' : 'rounded-md'} object-cover`}
          />
        )}

        {isMulti &&
          currentImageDetails.map((image: ImageDetail, index: number) => {
            return (
              <div key={`image-${index}`} className="relative mr-2 flex flex-wrap">
                <Image
                  src={image.url}
                  alt={`${name}-index`}
                  layout="fixed"
                  height={70}
                  width={imageOptions?.imageType === ImageAspectRatio.RECTANGLE ? 300 : 70}
                  unoptimized={true}
                  className="rounded-md object-cover"
                />
                {!disabled && (
                  <button type="button" onClick={removeImage(image.id)}>
                    <div className="absolute top-[-10px] right-[-10px] flex h-5 w-5 items-center justify-center rounded-full border bg-white">
                      <XIcon className="float-right h-4 w-4 cursor-pointer text-blue-500 opacity-90" />
                    </div>
                  </button>
                )}
              </div>
            )
          })}
      </div>

      <div className="text-right text-blue-600">
        <input
          id={`${name}-uploader`}
          className="hidden"
          type="file"
          ref={imageInput}
          multiple={isMulti}
          onChange={isMulti ? handleMultiImageUpload : handleSingleImageUpload}
          accept={defaultAcceptedImages.join(',')}
        />
        {!disabled && (
          <button
            type="button"
            onClick={() => {
              imageInput?.current?.click()
            }}
            id={`${name}-link`}
            className="text-sm"
          >
            {uploadLabel}
          </button>
        )}
      </div>
    </div>
  )
}
