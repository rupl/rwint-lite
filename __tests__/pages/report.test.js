/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedReport, { Report } from '../../pages/report.js'
import { mockUpdate } from '../../__fixtures__/data.fixture'

describe('Report page', () => {
  let container, store, wrapper
  const mockStore = configureStore()
  const initialState = {
    updateReports: [mockUpdate]
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedReport store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      const report = {
        fields: {
          title: 'the title'
        }
      }
      wrapper = shallow(<Report report={report} />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toBe(1)
    })

    it('passes the title to the layout', () => {
      expect(wrapper.find('Layout[title="the title"]').exists()).toBe(true)
    })

    it('returns the correct report from getInitialProps', () => {
      let fakeStore = {
        dispatch: function () {},
        getState: function () {
          return {
            updateReports: [mockUpdate, {id: 3}]
          }
        }
      }

      return Report.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 100}}).then(function (data) {
        expect(data.report).toEqual(mockUpdate)
      })
    })
  })
})

describe('Report page error handling', () => {
  let fakeStore, wrapper
  beforeAll(() => {
    wrapper = shallow(<Report error={404} />)
  })

  it('returns a 404 error to props', () => {
    fakeStore = {
      dispatch: function () {},
      getState: function () {
        return {
          updateReports: []
        }
      }
    }
    return Report.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 400}}).then(function (data) {
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
