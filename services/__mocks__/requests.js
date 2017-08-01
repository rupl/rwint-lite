/* eslint-env jest */
const getFeatured = jest.fn(() => Promise.resolve([{id: 'featuredId'}]))
const getHeadlines = jest.fn(() => Promise.resolve([{id: 1}]))

export { getFeatured, getHeadlines }
