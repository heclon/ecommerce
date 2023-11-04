/**
 * @group local-development
 */

import { fetchGeocodeResults } from '../GeocodeService'

describe('GeocodeService', () => {
  describe('fetchGeocodeResults', () => {
    test.each([
      ['address', { address: '11 Smith Street, Highgate WA, Australia' }],
      ['placeId', { place_id: 'ChIJv6RYJBu7MioRzs6dyMwSVJM' }],
    ])('when provided with a %p as the params', async (_paramType, params) => {
      expect(await fetchGeocodeResults(params)).toMatchSnapshot()
    })
  })
})
