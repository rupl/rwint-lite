/* eslint-env jest */
const getUpdates = jest.fn(() => Promise.resolve([{id: 1}]))

export {getUpdates}
