/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectHeadlines, { Headlines } from '../../components/Headlines.js'
import { mockHeadlines } from '../../__fixtures__/data.fixture'

describe('Headlines component', () => {
  let container, reportLinks, store, wrapper
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
      reportLinks = wrapper.find('ReportLink')
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('renders a report link for each report', () => {
      expect(reportLinks.length).toBe(10)
    })

    it('passes the report to the ReportLink', function () {
      const first = reportLinks.nodes[0]
      expect(first.props.report).toEqual(mockHeadlines.data[0])
    })
  })
})
