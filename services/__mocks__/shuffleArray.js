/* eslint-env jest */
const fakeShuffle = (arr) => {
  return [...arr.slice(0, 4), ...arr.slice(-4)]
}

const shuffleArray = jest.fn((arr) => fakeShuffle(arr))
export default shuffleArray
