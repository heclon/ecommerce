import SA3Service from '../SA3Service'

describe('SA3Service', () => {
  describe('should get the sa3 region for a participant', () => {
    test.each([
      ['WA', { lat: -31.9427541, lng: 115.8700133 }, '50302'],
      ['NSW', { lat: -33.88916706549489, lng: 151.21435677695575 }, '11703'],
      ['VIC', { lat: -37.81528566297772, lng: 144.96671914838876 }, '20604'],
      ['SA', { lat: -34.927100048436294, lng: 138.59985065064038 }, '40101'],
      ['QLD', { lat: -27.488246418045016, lng: 153.04152787666897 }, '30502'],
      ['NT', { lat: -12.441769025170528, lng: 130.84448469889216 }, '70101'],
      ['ACT', { lat: -35.30570027180818, lng: 149.126548852952 }, '80106'],
      ['TAS', { lat: -41.43690140329637, lng: 147.14073081039612 }, '60201'],
    ])('when provided with a %p lat long value', async (_state, latLng, expectedValue) => {
      const region = await SA3Service.getRegionForParticipant(latLng)
      expect(region?.sa3Code).toEqual(expectedValue)
    })
  })

  describe('should return void', () => {
    test.each([
      ['Auckland', { lat: -36.87234058948909, lng: 174.77408773083033 }],
      ['New York', { lat: 40.71141721403779, lng: -74.00859212384972 }],
      ['-2000, 2000', { lat: -2000, lng: 2000 }],
    ])('when provided with a non-Australian or incorrect lat long value such as %p', async (_name, latLng) => {
      const region = await SA3Service.getRegionForParticipant(latLng)
      expect(region).toBeUndefined()
    })
  })
})
