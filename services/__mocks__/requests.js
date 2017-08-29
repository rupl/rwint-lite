/* eslint-env jest */
import { mockCountries, mockFeatured, mockHeadlines, mockReports, mockReportsPage2, mockUpdate } from '../../__fixtures__/data.fixture'

const requestCountries = jest.fn(() => Promise.resolve(mockCountries))
const requestFeatured = jest.fn(() => Promise.resolve(mockFeatured))
const requestHeadlines = jest.fn(() => Promise.resolve(mockHeadlines))
const requestUpdates = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})
const requestUpdate = jest.fn(() => Promise.resolve([mockUpdate]))

export { requestCountries, requestFeatured, requestHeadlines, requestUpdate, requestUpdates }
