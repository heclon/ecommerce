import faker from 'faker/locale/en'
import React from 'react'

export const fakerSeedDecorator = (Story) => {
  faker.seed(123)
  return <Story />
}
