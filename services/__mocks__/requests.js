/* eslint-env jest */
import { mockCountry, mockCountries, mockDisasters, mockDisastersPage2, mockFeatured, mockHeadlines, mockReports, mockReportsPage2, mockUpdate } from '../../__fixtures__/data.fixture'

const requestCountry = jest.fn(() => Promise.resolve([mockCountry]))
const requestCountries = jest.fn(() => Promise.resolve(mockCountries))
const requestDisasters = jest.fn((x) => {
  let returnDisasters = x === '1' ? mockDisastersPage2 : mockDisasters
  return Promise.resolve(returnDisasters)
})
const requestFeatured = jest.fn(() => Promise.resolve(mockFeatured))
const requestHeadlines = jest.fn(() => Promise.resolve(mockHeadlines))
const requestUpdates = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})
const requestUpdate = jest.fn(() => Promise.resolve([mockUpdate]))

export { requestCountry, requestCountries, requestDisasters, requestFeatured, requestHeadlines, requestUpdate, requestUpdates }
