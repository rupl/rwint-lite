/* eslint-env jest */
const getFeatured = jest.fn(() => Promise.resolve([{id: 'featuredId'}]))
const getHeadlines = jest.fn(() => Promise.resolve([{id: 1}]))
const getUpdates = jest.fn(() => Promise.resolve([{id: 'updatesId'}]))

export { getFeatured, getHeadlines, getUpdates }
