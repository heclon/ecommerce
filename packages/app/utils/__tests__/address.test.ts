import { generateMaskedAddress } from '../address'

describe('address', () => {
  describe('generateMaskedAddress', () => {
    test.each([
      ['11 Waterfront Place, Port Melbourne VIC 3207, Australia', 'Port Melbourne VIC 3207, Australia'],
      ['80 Oxford St, Darlinghurst NSW 2010, Australia', 'Darlinghurst NSW 2010, Australia'],
      ['this is not the correct format', 'this is not the correct format'],
    ])('generateMaskedAddress(%s) => %s', (address, expectedAddress) => {
      expect(generateMaskedAddress(address)).toEqual(expectedAddress)
    })
  })
})
