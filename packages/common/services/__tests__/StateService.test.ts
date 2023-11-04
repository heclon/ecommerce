import StateService from '../StateService'

describe('StateService', () => {
  describe('getStateFromAddress', () => {
    test.each([
      ['80 Oxford St, Darlinghurst NSW 2010', 'NSW'],
      ['Gold Coast Hwy &, Elkhorn Ave, Surfers Paradise QLD 4217', 'QLD'],
      ['126 Kooyong Rd, Rivervale WA 6103', 'WA'],
      ['Shop 16/161 Collins St, Melbourne VIC 3000', 'VIC'],
      ['128 King William St, Adelaide SA 5000', 'SA'],
      ['5990 Arthur Hwy, Taranna TAS 7180', 'TAS'],
      ['1030 Majura Rd, Pialligo ACT 2609', 'ACT'],
      ['Botanic Gardens Access, Jervis Bay JBT 2540', 'JBT'],
    ])('.getStateFromAddress(%s) -> %s', (address, state) => {
      expect(StateService.getStateFromAddress(address)).toEqual(state)
    })
  })
})
