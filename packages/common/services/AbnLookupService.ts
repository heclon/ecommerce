import axios from 'axios'
import xml2js from 'xml2js'
import { config as dotenv } from 'dotenv-flow'
const parser = new xml2js.Parser({ explicitArray: false })

dotenv({ silent: true })

export interface ABN {
  identifierValue: string
  identifierStatus: string
}
interface BusinessName {
  score: string
  organisationName: string
  isCurrentIndicator: 'Y' | 'N'
}

interface PhysicalAddress {
  postcode: string
  stateCode: string
  isCurrentIndicator: 'Y' | 'N'
}

export interface LegalName {
  effectiveFrom?: Date
  effectiveTo?: Date
  familyName?: string
  givenName?: string
  otherGivenName?: string
  fullName?: string
  score?: string
}
interface GoodsAndServicesTax {
  effectiveFrom: Date
  effectiveTo: Date
}
interface EntityStatus {
  effectiveFrom: Date
  effectiveTo: Date
  entityStatusCode: 'Active' | 'Inactive'
}
interface EntityType {
  entityDescription: string
  entityTypeCode: string
}
interface ACNCRegistration {
  status: string
  effectiveFrom: Date
  effectiveTo: Date
}
interface CharityType {
  charityTypeDescription: string
  effectiveFrom: Date
  effectiveTo: Date
}
export interface BusinessEntity202001 {
  ASICNumber: string
  ABN: ABN
  legalName?: LegalName
  mainName: BusinessName
  mainTradingName?: BusinessName
  businessName?: BusinessName[]
  entityStatus: EntityStatus[]
  entityType: EntityType
  goodsAndServicesTax: GoodsAndServicesTax[]
  mainBusinessPhysicalAddress: PhysicalAddress[]
  recordLastUpdatedDate: Date
  charityType?: CharityType[]
  ACNCRegistration?: ACNCRegistration
}

export interface SearchByNameResult {
  ABN: ABN
  mainName: BusinessName
  score: number
  businessName: BusinessName
  mainBusinessPhysicalAddress: PhysicalAddress
  legalName: LegalName
}

export interface AbnDetails {
  abn?: string
  acn?: string
  organisationName?: string
  score?: string
}

interface FetchByCodeParams {
  searchString: string
  includeHistoricalDetails: string
}

interface FetchByNameParams {
  name: string
  legalName: string
  tradingName: string
  businessName: string
  activeABNsOnly: string
  NSW: string
  SA: string
  ACT: string
  VIC: string
  WA: string
  NT: string
  QLD: string
  TAS: string
  postcode: string
  searchWidth: string
  minimumScore: string
  maxSearchResults: string
}

const YES = 'Y'
const NO = 'N'
const abrBaseUrl = process.env.ABN_WS_URL
const authenticationGuid = process.env.ABN_WS_AUTHENTICATION_GUID

const contentTypeXMLAndUTF8 = 'text/xml; charset-utf-8'
const headers = {
  'Content-Type': contentTypeXMLAndUTF8,
}

const isValidAbn = (abn: string): boolean => {
  if (abn.length === 11 && /\d/.test(abn)) {
    return true
  }
  return false
}

const isValidAcn = (acn: string): boolean => {
  if (acn.length === 9 && /\d/.test(acn)) {
    return true
  }
  return false
}

const callAbrXmlSearchApi = async (
  method: string,
  fetchName: string,
  params: FetchByNameParams | FetchByCodeParams
) => {
  return axios
    .get(`${abrBaseUrl}/${method}?authenticationGuid=${authenticationGuid}`, {
      headers,
      params,
    })
    .catch((error) => {
      console.error(
        `Error in ${fetchName} (${method}) API call with params: ${JSON.stringify(
          params
        )} returned error pulling details from the ABR webservice. Error: , ${error.message}.`
      )
    })
}

const callAbnApiSearch = (): {
  fetchByName: (name: string) => Promise<SearchByNameResult[]>
  fetchByAbn: (abn: string) => Promise<BusinessEntity202001>
  fetchByAcn: (acn: string) => Promise<BusinessEntity202001>
  // eslint-disable-next-line sonarjs/cognitive-complexity
} => {
  if (!abrBaseUrl || !authenticationGuid) {
    throw Error('Please check the env variables ABN_WS_URL and ABN_WS_AUTHENTICATION_GUID')
  }

  return {
    fetchByAbn: async (abn) => {
      const params: FetchByCodeParams = {
        searchString: abn,
        includeHistoricalDetails: NO,
      }
      const method = 'SearchByABNv202001'
      const fetchName = 'fetchByAbn'
      const response = await callAbrXmlSearchApi(method, fetchName, params)

      if (response?.data) {
        const result = await parser.parseStringPromise(response?.data)
        if (result.ABRPayloadSearchResults.response.exception) {
          console.warn(result.ABRPayloadSearchResults.response.exception)
          return []
        }
        const entity = result.ABRPayloadSearchResults.response?.businessEntity202001
        // Just return Active ABNs
        if (entity.entityStatus.entityStatusCode === 'Active') return entity
      }
      return []
    },
    fetchByAcn: async (acn) => {
      const params: FetchByCodeParams = {
        searchString: acn,
        includeHistoricalDetails: NO,
      }
      const method = 'ABRSearchByASIC'
      const fetchName = 'fetchByAcn'
      const response = await callAbrXmlSearchApi(method, fetchName, params)
      if (response?.data) {
        const result = await parser.parseStringPromise(response?.data)
        if (result.ABRPayloadSearchResults.response?.exception) {
          console.warn(result.ABRPayloadSearchResults.response.exception)
          return []
        }
        const entity = result.ABRPayloadSearchResults.response?.businessEntity
        // Just return Active ABNs
        if (entity.entityStatus.entityStatusCode === 'Active') return entity
      }
      return []
    },
    fetchByName: async (name) => {
      const params: FetchByNameParams = {
        name: name,
        legalName: YES,
        tradingName: YES,
        businessName: YES,
        activeABNsOnly: YES,
        NSW: YES,
        SA: YES,
        ACT: YES,
        VIC: YES,
        WA: YES,
        NT: YES,
        QLD: YES,
        TAS: YES,
        postcode: '',
        searchWidth: '',
        minimumScore: '80',
        maxSearchResults: '20',
      }
      const method = 'ABRSearchByNameSimpleProtocol'
      const fetchName = 'fetchByName'
      const response = await callAbrXmlSearchApi(method, fetchName, params)
      if (response?.data) {
        const results = await parser.parseStringPromise(response?.data)
        if (results?.ABRPayloadSearchResults?.response.exception) {
          console.warn(results?.ABRPayloadSearchResults?.response.exception)
          return []
        }
        const searchResultsRecord =
          results?.ABRPayloadSearchResults?.response?.searchResultsList?.searchResultsRecord ?? []

        // searchResultsRecord can be an object or an array
        if (Array.isArray(searchResultsRecord)) return searchResultsRecord
        return [searchResultsRecord]
      }
      return []
    },
  }
}

const mapBusinessEntity202001ToAbnDetails = (resultSearchByAbn: BusinessEntity202001): AbnDetails => {
  return {
    abn: resultSearchByAbn?.ABN?.identifierValue,
    acn: resultSearchByAbn?.ASICNumber,
    organisationName:
      resultSearchByAbn?.mainName?.organisationName ||
      resultSearchByAbn?.mainTradingName?.organisationName ||
      `${resultSearchByAbn?.legalName?.givenName} ${resultSearchByAbn?.legalName?.familyName}`,
    score: '100',
  }
}

const mapSearchByNameResultToAbnDetails = (resultsSearchByName: SearchByNameResult): AbnDetails => {
  return {
    abn: resultsSearchByName.ABN?.identifierValue,
    score:
      resultsSearchByName.businessName?.score || // for companies
      resultsSearchByName.mainName?.score || // for companies
      resultsSearchByName.legalName?.score, // for sole traders
    acn: '',
    organisationName:
      resultsSearchByName.businessName?.organisationName || // for companies
      resultsSearchByName.mainName?.organisationName || // for companies
      resultsSearchByName.legalName?.fullName, // for sole traders
  }
}

//TODO: evaluate if we need to convert this to a class
export const abnLookupService = (() => {
  const abnApiService = callAbnApiSearch()
  return {
    lookup: async (searchString: string) => {
      if (isValidAbn(searchString)) {
        const searchResults: BusinessEntity202001 = await abnApiService.fetchByAbn(searchString)
        return [mapBusinessEntity202001ToAbnDetails(searchResults)]
      }
      if (isValidAcn(searchString)) {
        const searchResults: BusinessEntity202001 = await abnApiService.fetchByAcn(searchString)
        return [mapBusinessEntity202001ToAbnDetails(searchResults)]
      } else {
        const results: SearchByNameResult[] = await abnApiService.fetchByName(searchString)
        return results.map(mapSearchByNameResultToAbnDetails)
      }
    },
  }
})()
