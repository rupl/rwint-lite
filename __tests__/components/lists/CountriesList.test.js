/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import { mockCountries } from '../../../__fixtures__/data.fixture'
import ConnectedCountriesList, { CountriesList } from '../../../components/lists/CountriesList.js'

describe('CountriesList component', () => {
  let container, groups, links, store, wrapper
  const initialState = {
    countries: {
      items: mockCountries.data
    }
  }
  const mockStore = configureStore()

  describe('Connected component', () => {
    beforeAll(() => {
      store = mockStore(initialState)
      container = shallow(<ConnectedCountriesList store={store} />)
    })

    it('renders the component', () => {
      expect(container.length).toBe(1)
    })

    it('renders passes the countries from the store', () => {
      expect(container.prop('countries')).toEqual({items: mockCountries.data})
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<CountriesList countries={{items: mockCountries.data}} />)
      groups = wrapper.find('.group')
      links = wrapper.find('SimpleLink')
    })

    it('renders the component', () => {
      expect(wrapper.length).toBe(1)
    })

    it('groups the countries alphabetically', () => {
      expect(groups.length).toBe(5)
      expect(groups.at(0).find('h2').text()).toContain('A')
      expect(groups.at(0).find('li').length).toBe(2)
      expect(groups.at(4).find('h2').text()).toContain('Z')
      expect(groups.at(4).find('li').length).toBe(3)
    })

    it('renders a link for each country', () => {
      expect(links.length).toBe(10)
    })

    it('renders a back to top link for each group', () => {
      expect(wrapper.find('.top').length).toBe(5)
    })
  })

  describe('Searching countries', () => {
    beforeAll(() => {
      wrapper = shallow(<CountriesList countries={{items: mockCountries.data}} searchQuery='find' />)
      groups = wrapper.find('.group')
      links = wrapper.find('SimpleLink')
    })

    it('only displays countries that match the search form', () => {
      expect(links.length).toBe(2)
      expect(links.at(0).prop('link')).toEqual(mockCountries.data[4])
      expect(links.at(1).prop('link')).toEqual(mockCountries.data[7])
    })
  })
})
