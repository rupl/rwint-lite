/* eslint-env jest */
import { getFeatured, getUpdates } from '../../services/requests.js'
import { mockCountries, mockDisasters, mockEndpoints } from '../../__fixtures__/data.fixture'
jest.mock('../../services/shuffleArray')
const fetchMock = require('fetch-mock')
const testUrl = 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&limit=10&sort[]=date:desc&sort[]=title:asc&fields[include][]=country&fields[include][]=source&fields[include][]=date'
const featuredCountriesUrl = mockEndpoints.featuredCountries
const featuredDisastersUrl = mockEndpoints.featuredDisasters
const mockFeaturedCountries = mockCountries
const mockFeaturedDisasters = mockDisasters
let result

describe('API requests', () => {
  describe('Get Updates', () => {
    beforeAll(async () => {
      fetchMock.get(testUrl, {data: 'my data'})
      result = await getUpdates()
    })

    it('calls the updates end point', () => {
      expect(fetchMock.called(testUrl)).toBe(true)
    })

    it('returns the data', () => {
      expect(result).toBe('my data')
    })
  })

  describe('Get Featured', () => {
    beforeAll(async () => {
      fetchMock.get(featuredCountriesUrl, {data: mockFeaturedCountries})
      fetchMock.get(featuredDisastersUrl, {data: mockFeaturedDisasters})
      result = await getFeatured()
    })

    it('calls the featured countries endpoint', () => {
      expect(fetchMock.called(featuredCountriesUrl)).toBe(true)
    })

    it('calls the featured disasters endpoint', () => {
      expect(fetchMock.called(featuredDisastersUrl)).toBe(true)
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
})
