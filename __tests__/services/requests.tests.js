/* eslint-env jest */
import { requestCountry, requestCountries, requestFeatured, requestHeadlines, requestUpdate, requestUpdates } from '../../services/requests.js'
import { mockCountry, mockCountries, mockDisasters, mockEndpoints, mockHeadlines, mockReports, mockUpdate } from '../../__fixtures__/data.fixture'
jest.mock('../../helpers/shuffleArray')
const fetchMock = require('fetch-mock')

describe('API requests', () => {
  let expectedBody, result

  describe('Get Featured', () => {
    beforeAll(async () => {
      fetchMock.post(mockEndpoints.featuredCountries, {data: mockCountries})
      fetchMock.post(mockEndpoints.featuredDisasters, {data: mockDisasters})
      result = await requestFeatured()
    })
    afterAll(fetchMock.restore)

    it('posts to the featured countries endpoint', () => {
      expect(fetchMock.called(mockEndpoints.featuredCountries)).toEqual(true)
      expectedBody = {
        filter: {
          field: 'featured',
          value: true
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })

    it('posts to the featured disasters endpoint', () => {
      expect(fetchMock.called(mockEndpoints.featuredDisasters)).toEqual(true)
      expectedBody = {
        filter: {
          field: 'featured',
          value: true
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
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
      fetchMock.post(mockEndpoints.updates, mockReports)
      result = await requestHeadlines()
    })
    afterAll(fetchMock.restore)

    it('posts to the headlines endpoint', () => {
      expect(fetchMock.called(mockEndpoints.headlines)).toEqual(true)
      expectedBody = {
        limit: 16,
        offset: 0,
        sort: ['date:desc'],
        fields: {
          include: ['headline.title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
        },
        filter: {
          field: 'headline'
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })

    it('returns the data', () => {
      expect(result[0].id).toEqual(mockHeadlines[0].id)
      expect(result[1].fields.title).toEqual(mockHeadlines[1].fields.title)
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

  describe('Get Updates', () => {
    beforeAll(async () => {
      fetchMock.post(mockEndpoints.updates, mockReports)
      result = await requestUpdates()
    })
    afterAll(fetchMock.restore)

    it('sends a post request with the correct body data', () => {
      expect(fetchMock.called(mockEndpoints.updates)).toEqual(true)
      expectedBody = {
        limit: 10,
        offset: 0,
        preset: 'latest',
        sort: ['date:desc'],
        fields: {
          include: ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })

    it('returns the data', () => {
      expect(result.data[0].id).toEqual(mockReports.data[0].id)
      expect(result.data[1].fields.title).toEqual(mockReports.data[1].fields.title)
    })

    it('formats and adds the url-friendly country using the shortname if present to each result', () => {
      expect(result.data[0].urlCountry).toBe('so-yo')
    })

    it('formats and adds the url-friendly country using the name if no shortname to each result', () => {
      expect(result.data[1].urlCountry).toBe('south-yorkshire')
    })

    it('formats and adds the url-friendly title to each result', () => {
      expect(result.data[0].urlTitle).toBe('report-something-words-en-uk-0')
    })
  })

  describe('Get next page of updates', () => {
    beforeAll(async () => {
      fetchMock.post(mockEndpoints.updates, mockReports)
      result = await requestUpdates(10)
    })
    afterAll(fetchMock.restore)

    it('sends the post request with offset set to 10', () => {
      expect(fetchMock.called(mockEndpoints.updates)).toEqual(true)
      expectedBody = {
        limit: 10,
        offset: 10,
        preset: 'latest',
        sort: ['date:desc'],
        fields: {
          include: ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })
  })

  describe('Get queried updates', () => {
    beforeAll(async () => {
      fetchMock.post(mockEndpoints.updates, mockReports)
      result = await requestUpdates(0, 10, 'country.exact:"Syria"')
    })
    afterAll(fetchMock.restore)

    it('sends the post request with the query', () => {
      expect(fetchMock.called(mockEndpoints.updates)).toEqual(true)
      expectedBody = {
        limit: 10,
        offset: 0,
        preset: 'latest',
        sort: ['date:desc'],
        fields: {
          include: ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
        },
        query: {
          value: 'country.exact:"Syria"',
          operator: 'AND'
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })

    it('returns the data', () => {
      expect(result.data[0].id).toEqual(mockReports.data[0].id)
      expect(result.data[1].fields.title).toEqual(mockReports.data[1].fields.title)
    })
  })

  describe('Get Countries', () => {
    beforeAll(async () => {
      fetchMock.post(mockEndpoints.countries, {data: mockCountries})
      result = await requestCountries()
    })
    afterAll(fetchMock.restore)

    it('posts to the countries endpoint', () => {
      expect(fetchMock.called(mockEndpoints.countries)).toEqual(true)
      expectedBody = {
        limit: 300,
        offset: 0,
        sort: ['name:asc'],
        fields: {
          include: ['name', 'iso3']
        }
      }
      expect(fetchMock.lastOptions()).toEqual({
        method: 'post',
        body: JSON.stringify(expectedBody)
      })
    })

    it('returns the data', () => {
      expect(result[0].id).toEqual(mockCountries[0].id)
      expect(result[1].fields.title).toEqual(mockCountries[1].fields.title)
    })

    it('adds the type to each result', () => {
      expect(result[0].type).toBe('country')
    })

    it('formats and adds the url name to each result', () => {
      expect(result[0].urlName).toBe('a-country-name-0')
    })
  })

  describe('Get an Update', () => {
    beforeAll(async () => {
      fetchMock.get(mockEndpoints.update, {data: mockUpdate})
      result = await requestUpdate(100)
    })
    afterAll(fetchMock.restore)

    it('calls the update endpoint', () => {
      expect(fetchMock.called(mockEndpoints.update)).toBe(true)
    })

    it('returns the data', () => {
      expect(result.id).toEqual(mockUpdate.id)
      expect(result.fields.title).toEqual(mockUpdate.fields.title)
    })
  })

  describe('Get a Country', () => {
    beforeAll(async () => {
      fetchMock.get(mockEndpoints.country, {data: mockCountry})
      result = await requestCountry(100)
    })
    afterAll(fetchMock.restore)

    it('calls the country endpoint', () => {
      expect(fetchMock.called(mockEndpoints.country)).toBe(true)
    })

    it('returns the data', () => {
      expect(result.id).toEqual(mockCountry.id)
      expect(result.fields.name).toEqual(mockCountry.fields.name)
    })
  })
})
