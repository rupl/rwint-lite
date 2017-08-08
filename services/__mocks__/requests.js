/* eslint-env jest */
import { mockReports, mockReportsPage2 } from '../../__fixtures__/data.fixture'

const getFeatured = jest.fn(() => Promise.resolve([{id: 'featuredId'}]))
const getHeadlines = jest.fn(() => Promise.resolve([{id: 1}]))
const getUpdates = jest.fn((x) => {
  let returnReports = x === '1' ? mockReportsPage2 : mockReports
  return Promise.resolve(returnReports)
})

export { getFeatured, getHeadlines, getUpdates }
