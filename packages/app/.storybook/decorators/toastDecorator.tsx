import { Toaster } from 'react-hot-toast'
import React from 'react'
import { DecoratorFn } from '@storybook/react'

const toastDecorator: DecoratorFn = (Story) => {
  return (
    <>
      <Story />
      <Toaster
        toastOptions={{
          success: {
            style: {
              backgroundColor: '#7C3BED',
              color: '#fff',
            },
          },
          error: {
            style: {
              backgroundColor: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
    </>
  )
}
export default toastDecorator
