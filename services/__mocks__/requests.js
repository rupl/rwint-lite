/* eslint-env jest */
const getFeatured = jest.fn(() => Promise.resolve([{id: 'featuredId'}]))
const getUpdates = jest.fn(() => Promise.resolve([{id: 1}]))

export { getFeatured, getUpdates }
