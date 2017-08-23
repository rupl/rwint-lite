import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer, theInitialState } from './reducers/data'

export const initStore = (initialState = theInitialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk))
}
