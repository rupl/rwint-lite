/* eslint-env jest */
import { mockCountry, mockCountries, mockDisaster, mockDisasters, mockDisastersPage2, mockFeatured, mockHeadlines,
  mockJobs, mockJobsPage2, mockReports, mockReportsPage2, mockTrainings, mockTrainingsPage2, mockUpdate } from '../../__fixtures__/data.fixture'

const requestCountry = jest.fn(() => Promise.resolve([mockCountry]))
const requestCountries = jest.fn(() => Promise.resolve(mockCountries))
const requestDisaster = jest.fn(() => Promise.resolve([mockDisaster]))
const requestDisasters = jest.fn((x) => {
  let returnDisasters = x === '1' ? mockDisastersPage2 : mockDisasters
  return Promise.resolve(returnDisasters)
})
const requestFeatured = jest.fn(() => Promise.resolve(mockFeatured))
const requestHeadlines = jest.fn(() => Promise.resolve(mockHeadlines))
const requestJobs = jest.fn((x) => {
  let returnJobs = x === '1' ? mockJobsPage2 : mockJobs
  return Promise.resolve(returnJobs)
})
const requestTrainings = jest.fn((x) => {
  let returnTrainings = x === '1' ? mockTrainingsPage2 : mockTrainings
  return Promise.resolve(returnTrainings)
})
const requestUpdates = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})
const requestUpdate = jest.fn(() => Promise.resolve([mockUpdate]))

export { requestCountry, requestCountries, requestDisaster, requestDisasters, requestFeatured, requestHeadlines,
  requestJobs, requestTrainings, requestUpdate, requestUpdates }
