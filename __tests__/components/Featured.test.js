/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedFeatured, { Featured } from '../../components/Featured.js'
import { mockFeatured } from '../../__fixtures__/data.fixture'

describe('Featured component', () => {
  let store, container, simpleLinks, wrapper
  const initialState = {
    items: mockFeatured
  }
  const mockStore = configureStore()

  describe('Connected component', () => {
    beforeAll(() => {
      store = mockStore(initialState)
      container = shallow(<ConnectedFeatured store={store} />)
    })

    it('renders the component', () => {
      expect(container.length).toEqual(1)
    })

    it('renders passes the featured items from the store', () => {
      expect(container.prop('items')).toEqual(mockFeatured)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Featured featured={initialState} />)
      simpleLinks = wrapper.find('SimpleLink')
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('renders a link for each featured item', () => {
      expect(simpleLinks.length).toBe(6)
    })

    it('passes the link to the SimpleLink', function () {
      const first = simpleLinks.nodes[0]
      expect(first.props.link).toEqual(mockFeatured[0])
    })
  })
})
