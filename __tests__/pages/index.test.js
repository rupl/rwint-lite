/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedIndex, { Index } from '../../pages/index.js'
import { mockHeadlines } from '../../__fixtures__/data.fixture'

// jest.mock('../../services/requests')

describe('Index page', () => {
  let container, store, wrapper
  const mockStore = configureStore()

  const initialState = {
    headlines: {
      items: mockHeadlines
    }
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedIndex store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toEqual(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Index headlines={mockHeadlines} />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
      // expect(wrapper.prop('headlines')).toEqual([])
    })
  })

  // TO DO
  // test it gets the stuff from store

  // it('calls getHeadlines and return the updates from the request', () => {
  //   // console.log(container.props())
  //   // expect(container.prop('headlines')).toEqual(mockHeadlines)
  //   return container.getInitialProps().then(data => expect(data.featured).toEqual([{id: 'featuredId'}]))
  // })

  // it('calls getFeatured and return the updates from the request', () => {
  //   expect.assertions(1)
  //   return App.getInitialProps().then(data => expect(data.featured).toEqual([{id: 'featuredId'}]))
  // })
})
