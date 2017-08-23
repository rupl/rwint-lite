/* eslint-env jest */
import { mockFeatured, mockHeadlines, mockReports, mockReportsPage2 } from '../../__fixtures__/data.fixture'

const requestFeatured = jest.fn(() => Promise.resolve(mockFeatured))
const requestHeadlines = jest.fn(() => Promise.resolve(mockHeadlines))
const requestUpdates = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})

export { requestFeatured, requestHeadlines, requestUpdates }
