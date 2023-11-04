/**
 * @group integration
 */
import { abnLookupService, AbnDetails } from '../AbnLookupService'
import ms from 'ms'

jest.setTimeout(ms('30s'))

describe('ABNLookupService', () => {
  const nameToSearch = 'PROVIDER CHOICE PLAN MANAGEMENT'
  const abnToSearch = 96627164194
  const acnToSearch = 627164194
  const proChoLegalName = 'PROVIDER CHOICE PLAN MANAGEMENT PTY LTD'

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('lookup', () => {
    it('searching by business name for an Business Entity works', async () => {
      const results: AbnDetails[] | undefined | AbnDetails = await abnLookupService.lookup(nameToSearch)
      if (results) {
        const proCho = results[0] // searched by exact name so proCho must be the first result
        expect(proCho?.organisationName).toEqual(proChoLegalName)
        expect(proCho?.abn).toBe(abnToSearch.toString())
      }
    })
    it('searching with an empty string returns empty array', async () => {
      const results: AbnDetails[] | undefined | AbnDetails = await abnLookupService.lookup('')
      expect(results).toEqual([])
    })

    it('searching with a valid ABN code works', async () => {
      const resultUsingAbn: AbnDetails[] = await abnLookupService.lookup(abnToSearch.toString())
      expect(resultUsingAbn).toEqual([
        {
          abn: '96627164194',
          acn: '627164194',
          organisationName: proChoLegalName,
          score: '100',
        },
      ])
    })
    it('searching by ABN with an empty code returns empty array', async () => {
      await expect(abnLookupService.lookup('')).resolves.toEqual([])
    })

    it('searching with a valid ACN code works', async () => {
      const resultUsingAcn: AbnDetails[] = await abnLookupService.lookup(acnToSearch.toString())
      expect(resultUsingAcn).toEqual([
        {
          abn: '96627164194',
          acn: '627164194',
          organisationName: proChoLegalName,
          score: '100',
        },
      ])
    })
    it('searching by ACN with an empty code returns empty array', async () => {
      await expect(abnLookupService.lookup('')).resolves.toEqual([])
    })
    it('search by name with one result does not fail', async () => {
      await expect(abnLookupService.lookup('asdasdasdasd')).resolves.toBeTruthy()
    })
  })
})
