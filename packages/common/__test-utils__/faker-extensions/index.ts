import faker from 'faker/locale/en'

/** Mocks CUID values https://github.com/paralleldrive/cuid2 */
export const fakeCuid = () => faker.random.alphaNumeric(16)

export const fakeWesternAustraliaAddress = () => `${faker.address.streetAddress()}, WA, Australia`
