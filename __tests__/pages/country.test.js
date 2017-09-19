/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedCountry, { Country } from '../../pages/country.js'
import { mockCountry } from '../../__fixtures__/data.fixture'

describe('Country page', () => {
  let container, fakeStore2, store, wrapper
  const mockStore = configureStore()
  const mockDispatch = jest.fn(() => function () {})
  let fakeStore = {
    dispatch: mockDispatch,
    getState: function () {
      return {
        countryReports: [mockCountry],
        updates: {
          canLoadMore: true
        }
      }
    }
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore()
      container = shallow(<ConnectedCountry store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Country country={mockCountry} />)
    })

    it('renders the page', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a link to the page on the main RW site', () => {
      const link = wrapper.find('.btn-small')
      expect(link.exists()).toBe(true)
      expect(link.prop('href')).toBe('https://reliefweb.int/country/qwe')
    })

    it('gets the country', () => {
      return Country.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {id: mockCountry.id}}).then(function (data) {
        expect(data.country).toEqual(mockCountry)
      })
    })

    it('sets the search query from the country', () => {
      return Country.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {id: mockCountry.id}}).then(function (data) {
        expect(data.query).toEqual('country.exact:"' + mockCountry.fields.name + '"')
      })
    })

    it('sets canLoadMore from the store', () => {
      fakeStore2 = {
        dispatch: mockDispatch,
        getState: function () {
          return {
            countryReports: [mockCountry],
            updates: {
              canLoadMore: false
            }
          }
        }
      }
      return Country.getInitialProps({store: fakeStore2, isServer: false, pathname: 'blah', query: {id: mockCountry.id}}).then(function (data) {
        expect(data.canLoadMore).toBe(false)
      })
    })

    it('sets the current page to 1 if no page in query string', () => {
      return Country.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {id: mockCountry.id}}).then(function (data) {
        expect(data.currentPage).toBe(1)
      })
    })

    it('gets the current page number from the query string if present', () => {
      return Country.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {id: mockCountry.id, page: 12}}).then(function (data) {
        expect(data.currentPage).toBe(12)
      })
    })
    it('sets showPagination to true if is server rendered and the page number is greater than 1', () => {
      return Country.getInitialProps({store: fakeStore, isServer: true, pathname: 'blah', query: {id: mockCountry.id, page: 3}}).then(function (data) {
        expect(data.showPagination).toBe(true)
      })
    })

    it('sets showPagination to false if is server rendered and the page number is 1', () => {
      return Country.getInitialProps({store: fakeStore, isServer: true, pathname: 'blah', query: {id: mockCountry.id}}).then(function (data) {
        expect(data.showPagination).toBe(false)
      })
    })

    it('sets showPagination to false if is not server rendered and the page number is greater than 1', () => {
      return Country.getInitialProps({store: fakeStore, isServer: false, pathname: 'blah', query: {id: mockCountry.id, page: 3}}).then(function (data) {
        expect(data.showPagination).toBe(false)
      })
    })
  })
})
