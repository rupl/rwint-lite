/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedDisaster, { Disaster } from '../../pages/disaster.js'
import { mockDisaster } from '../../__fixtures__/data.fixture'

describe('Disaster page', () => {
  let container, store, wrapper
  const mockStore = configureStore()
  const initialState = {
    updateDisasters: [mockDisaster]
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedDisaster store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      const report = {
        fields: {
          name: 'the name',
          country: [{name: 'Sudan'}, {name: 'somewhere else'}],
          source: [{name: 'source1'}],
          url_alias: 'http://reliefweb/something'
        }
      }
      wrapper = shallow(<Disaster report={report} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('passes the title to the layout', () => {
      expect(wrapper.find('Layout').prop('title')).toEqual('the name')
    })

    it('passes the url to the layout', () => {
      expect(wrapper.find('Layout').prop('url')).toEqual('http://reliefweb/something')
    })

    it('passes the keywords to the layout', () => {
      expect(wrapper.find('Layout').prop('keywords')).toEqual('humanitarian, Sudan, somewhere else, source1')
    })

    it('returns the correct report from getInitialProps', () => {
      let fakeStore = {
        dispatch: function () {},
        getState: function () {
          return {
            disasterReports: [mockDisaster, {id: 3}]
          }
        }
      }

      return Disaster.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 200}}).then(function (data) {
        expect(data.report).toEqual(mockDisaster)
      })
    })
  })
})

describe('Disaster page error handling', () => {
  let fakeStore, wrapper
  beforeAll(() => {
    wrapper = shallow(<Disaster error={404} />)
  })

  it('returns a 404 error to props', () => {
    fakeStore = {
      dispatch: function () {},
      getState: function () {
        return {
          disasterReports: []
        }
      }
    }
    return Disaster.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 400}}).then(function (data) {
      expect(data.report).toBe(undefined)
      expect(data.error).toBe(404)
    })
  })

  it('renders the error page', () => {
    expect(wrapper.find('Error').exists()).toBe(true)
  })

  it('does not render the article layout', () => {
    expect(wrapper.find('ArticleLayout').exists()).toBe(false)
  })
})
