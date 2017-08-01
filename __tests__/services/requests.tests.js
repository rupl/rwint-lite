/* eslint-env jest */
import { getFeatured, getHeadlines } from '../../services/requests.js'
import { mockCountries, mockDisasters, mockEndpoints, mockReports } from '../../__fixtures__/data.fixture'
jest.mock('../../services/shuffleArray')
const fetchMock = require('fetch-mock')
let result

describe('API requests', () => {
  // describe('Get Updates', () => {
  //   beforeAll(async () => {
  //     fetchMock.get(testUrl, {data: 'my data'})
  //     result = await getUpdates()
  //   })

  //   it('calls the updates end point', () => {
  //     expect(fetchMock.called(testUrl)).toBe(true)
  //   })

  //   it('returns the data', () => {
  //     expect(result).toBe('my data')
  //   })
  // })

  describe('Get Featured', () => {
    beforeAll(async () => {
      fetchMock.get(mockEndpoints.featuredCountries, {data: mockCountries})
      fetchMock.get(mockEndpoints.featuredDisasters, {data: mockDisasters})
      result = await getFeatured()
    })

    it('calls the featured countries endpoint', () => {
      expect(fetchMock.called(mockEndpoints.featuredCountries)).toBe(true)
    })

    it('calls the featured disasters endpoint', () => {
      expect(fetchMock.called(mockEndpoints.featuredDisasters)).toBe(true)
    })

    it('returns 6 from the merged and shuffled array data', () => {
      // shuffle is mocked to return first and last 4 items of the array
      expect(result.length).toBe(6)
      expect(result[0].id).toEqual(mockCountries[0].id)
      expect(result[5].id).toEqual(mockDisasters[7].id)
    })

    it('adds the type to each result', () => {
      expect(result[0].type).toBe('country')
      expect(result[5].type).toBe('disaster')
    })

    it('formats and adds the url name to each result', () => {
      expect(result[0].urlName).toBe('a-country-name-0')
      expect(result[5].urlName).toBe('oh-no-a-disaster-name-7')
    })
  })

  describe('Get Headlines', () => {
    beforeAll(async () => {
      fetchMock.get(mockEndpoints.headlines, {data: mockReports})
      result = await getHeadlines()
    })

    it('calls the featured countries endpoint', () => {
      expect(fetchMock.called(mockEndpoints.headlines)).toBe(true)
    })

    it('returns the data', () => {
      expect(result[0].id).toEqual(mockReports[0].id)
      expect(result[1].fields.title).toEqual(mockReports[1].fields.title)
    })

    it('formats and adds the url-friendly country using the shortname if present to each result', () => {
      expect(result[0].urlCountry).toBe('so-yo')
    })

    it('formats and adds the url-friendly country using the name if no shortname to each result', () => {
      expect(result[1].urlCountry).toBe('south-yorkshire')
    })

    it('formats and adds the url-friendly title to each result', () => {
      expect(result[0].urlTitle).toBe('report-something-words-en-uk-0')
    })
  })
})
