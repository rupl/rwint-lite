/* eslint-env jest */
import { mockCountry, mockCountries, mockDisaster, mockDisasters, mockDisastersPage2, mockFeatured, mockHeadlines, mockJob,
  mockJobs, mockJobsPage2, mockReports, mockReportsPage2, mockTraining, mockTrainings, mockTrainingsPage2, mockUpdate } from '../../__fixtures__/data.fixture'

export const requestCountry = jest.fn(() => Promise.resolve([mockCountry]))
export const requestCountries = jest.fn(() => Promise.resolve(mockCountries))
export const requestDisaster = jest.fn(() => Promise.resolve([mockDisaster]))
export const requestDisasters = jest.fn((x) => {
  let returnDisasters = x === '1' ? mockDisastersPage2 : mockDisasters
  return Promise.resolve(returnDisasters)
})
export const requestFeatured = jest.fn(() => Promise.resolve(mockFeatured))
export const requestHeadlines = jest.fn(() => Promise.resolve(mockHeadlines))
export const requestJob = jest.fn(() => Promise.resolve([mockJob]))
export const requestJobs = jest.fn((x) => {
  let returnJobs = x === '1' ? mockJobsPage2 : mockJobs
  return Promise.resolve(returnJobs)
})
export const requestTraining = jest.fn((x) => {
  if (x === 'error') {
    return Promise.resolve({ok: false, status: 404})
  }
  return Promise.resolve([mockTraining])
})
export const requestTrainings = jest.fn((x) => {
  if (x === 990) { // use an arbitrary offset value to trigger error response
    return Promise.resolve({ok: false, status: 404})
  }
  let returnTrainings = x === '1' ? mockTrainingsPage2 : mockTrainings
  return Promise.resolve(returnTrainings)
})
export const requestReports = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})
export const requestUpdate = jest.fn(() => Promise.resolve([mockUpdate]))
