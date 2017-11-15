/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedReportListing, { ReportListing } from '../../pages/report-listing.js'

describe('Updates page', () => {
  let container, fakeStore, store, wrapper
  const mockStore = configureStore()
  const mockDispatch = jest.fn(() => function () {})

  const initialState = {
    reports: {
      canLoadMore: true,
      currentPage: 4
    }
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedReportListing store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<ReportListing />)
    })

    it('renders the page', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('sets canLoadMore from the store', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: false
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {}}).then(function (data) {
        expect(data.canLoadMore).toBe(false)
      })
    })

    it('sets the current page to 1 if no page in query string', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {}}).then(function (data) {
        expect(data.currentPage).toBe(1)
      })
    })

    it('gets the current page number from the query string if present', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {page: 12}}).then(function (data) {
        expect(data.currentPage).toBe(12)
      })
    })

    it('gets the search query from the query string if present', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {search: 'Syria'}}).then(function (data) {
        expect(data.query).toBe('Syria')
      })
    })

    it('sets showPagination to true if is server rendered and the page number is greater than 1', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: true, pathname: 'blah', query: {page: 3}}).then(function (data) {
        expect(data.showPagination).toBe(true)
      })
    })

    it('sets showPagination to false if is server rendered and the page number is 1', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: true, pathname: 'blah', query: {}}).then(function (data) {
        expect(data.showPagination).toBe(false)
      })
    })

    it('sets showPagination to false if is not server rendered and the page number is greater than 1', () => {
      fakeStore = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            reports: {
              canLoadMore: true
            }
          }
        }
      }
      return ReportListing.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {page: 3}}).then(function (data) {
        expect(data.showPagination).toBe(false)
      })
    })
  })
})
