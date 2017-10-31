/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectHeadlines, { Headlines } from '../../components/Headlines.js'
import { mockHeadlines } from '../../__fixtures__/data.fixture'

describe('Headlines component', () => {
  let container, headlineLinks, store, wrapper
  const initialState = {
    items: mockHeadlines.data
  }
  const mockStore = configureStore()

  describe('Connected component', () => {
    beforeAll(() => {
      store = mockStore(initialState)
      container = shallow(<ConnectHeadlines store={store} />)
    })

    it('renders the component', () => {
      expect(container.length).toEqual(1)
    })

    it('renders passes the headlines items from the store', () => {
      expect(container.prop('items')).toEqual(mockHeadlines.data)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Headlines headlines={initialState} />)
      headlineLinks = wrapper.find('HeadlineLink')
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('renders a headline link for each report', () => {
      expect(headlineLinks.length).toBe(10)
    })

    it('passes the report to the ReportLink', function () {
      const first = headlineLinks.nodes[0]
      expect(first.props.report).toEqual(mockHeadlines.data[0])
    })
  })
})
