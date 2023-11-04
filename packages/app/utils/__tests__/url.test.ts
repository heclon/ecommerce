import { fixUrl, validateFixURL } from '../url'

function setup(website: string) {
  const testErrors = {}
  const testInfoFormValues = {
    website,
  }
  return { testErrors, testInfoFormValues }
}

describe('urlUtils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const testError = {
    website: 'Please provide a valid website',
  }
  const httpecommerceUrl = 'http://www.ecommerce.com.au'
  describe('validateFixURL', () => {
    it('it should validate a valid http://website.com regex for the website', () => {
      const { testInfoFormValues, testErrors } = setup('http://yahoo.com')
      validateFixURL(testInfoFormValues, testErrors)
      expect(testErrors).not.toEqual(expect.objectContaining(testError))
    })
    it('it should validate a valid https://website.com regex for the website', () => {
      const { testInfoFormValues, testErrors } = setup('https://yahoo.com')
      validateFixURL(testInfoFormValues, testErrors)
      expect(testErrors).not.toEqual(expect.objectContaining(testError))
    })

    it('it should validate and fix www.website.com into http://www.yahoo.com for the website', () => {
      const { testInfoFormValues, testErrors } = setup('www.yahoo.com')
      validateFixURL(testInfoFormValues, testErrors)
      expect(testErrors).not.toEqual(expect.objectContaining(testError))
      expect(testInfoFormValues.website).toBe('http://www.yahoo.com')
    })

    it('it should fail to validate http:website.com for the website', () => {
      const { testInfoFormValues, testErrors } = setup('http:website.com')
      validateFixURL(testInfoFormValues, testErrors)
      expect(testErrors).toEqual(expect.objectContaining(testError))
    })

    it('it should fail to validate http//website.com for the website', () => {
      const { testInfoFormValues, testErrors } = setup('http//website.com')
      validateFixURL(testInfoFormValues, testErrors)
      expect(testErrors).toEqual(expect.objectContaining(testError))
    })
  })
  describe('fixUrl', () => {
    it('it should fix the url www.ecommerce.com.au with the http:// prefix', () => {
      const url = 'www.ecommerce.com.au'
      const fixedUrl = fixUrl(url)
      expect(fixedUrl).toBe(httpecommerceUrl)
    })
    it('it should fix the url ecommerce.com.au with the http:// prefix', () => {
      const url = 'ecommerce.com.au'
      const fixedUrl = fixUrl(url)
      expect(fixedUrl).toBe('http://ecommerce.com.au')
    })
    it('it does not need to fix the url http://www.ecommerce.com.au with the http:// prefix', () => {
      const fixedUrl = fixUrl(httpecommerceUrl)
      expect(fixedUrl).toBe(httpecommerceUrl)
    })
    it('it does not need to fix the url https://www.ecommerce.com.au with the http:// prefix', () => {
      const url = 'https://www.ecommerce.com.au'
      const fixedUrl = fixUrl(url)
      expect(fixedUrl).toBe('https://www.ecommerce.com.au')
    })
    it('it returns the same (when the URL is an optional field)', () => {
      const url = ''
      const fixedUrl = fixUrl(url)
      expect(fixedUrl).toBe('')
    })
    it('it returns the same (when the URL is an optional field)', () => {
      const url = '!@#'
      const fixedUrl = fixUrl(url)
      expect(fixedUrl).toBe('!@#')
    })
  })
})
