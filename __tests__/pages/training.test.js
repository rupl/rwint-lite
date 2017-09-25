/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedTraining, { Training } from '../../pages/training.js'
import { mockTraining } from '../../__fixtures__/data.fixture'

describe('Training page', () => {
  let container, store, wrapper
  const mockStore = configureStore()
  const initialState = {
    trainingReports: [mockTraining]
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedTraining store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      const training = {
        fields: {
          title: 'the title'
        }
      }
      wrapper = shallow(<Training report={training} />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toBe(1)
    })

    it('passes the title to the layout', () => {
      expect(wrapper.find('Layout[title="the title"]').exists()).toBe(true)
    })

    it('returns the correct training from getInitialProps', () => {
      let fakeStore = {
        dispatch: function () {},
        getState: function () {
          return {
            trainingReports: [mockTraining, {id: 3}]
          }
        }
      }

      return Training.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 400}}).then(function (data) {
        expect(data.report).toEqual(mockTraining)
      })
    })
  })
})

describe('Training page error handling', () => {
  let fakeStore, wrapper
  beforeAll(() => {
    wrapper = shallow(<Training error={404} />)
  })

  it('returns a 404 error to props', () => {
    fakeStore = {
      dispatch: function () {},
      getState: function () {
        return {
          trainingReports: []
        }
      }
    }
    return Training.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 400}}).then(function (data) {
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
