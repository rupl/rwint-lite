/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedUpdates, { Updates } from '../../pages/updates.js'

describe('Updates page', () => {
  let container, store, wrapper
  const mockStore = configureStore()

  const initialState = {
    updates: {
      canLoadMore: true,
      currentPage: 4
    }
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedUpdates store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toEqual(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Updates />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('renders the page', () => {
      let fakeStore = {
        dispatch: function () {},
        getState: function () {
          return {
            updates: {
              canLoadMore: true,
              currentPage: 3
            }
          }
        }
      }
      return Updates.getInitialProps({store: fakeStore, isServer: true, pathname: 'blah', query: {page: 3}}).then(function (data) {
        expect(data.currentPage).toBe(3)
        expect(data.canLoadMore).toBe(true)
        expect(data.showPagination).toBe(true)
      })
    })
  })
})

// TO DO
// Test load more and other methods
