/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedCountryListing from '../../pages/country-listing.js'
import { mockCountries } from '../../__fixtures__/data.fixture'

describe('Countries page', () => {
  let container, store
  const mockStore = configureStore()

  const initialState = {
    countries: {
      items: mockCountries
    }
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedCountryListing store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toEqual(true)
    })
  })
})
