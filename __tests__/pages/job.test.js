/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedJob, { Job } from '../../pages/job.js'
import { mockJob } from '../../__fixtures__/data.fixture'

describe('Job page', () => {
  let container, store, wrapper
  const mockStore = configureStore()
  const initialState = {
    jobReports: [mockJob]
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedJob store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toBe(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      const job = {
        fields: {
          title: 'the title'
        }
      }
      wrapper = shallow(<Job report={job} />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toBe(1)
    })

    it('passes the title to the layout', () => {
      expect(wrapper.find('Layout[title="the title"]').exists()).toBe(true)
    })

    it('returns the correct job from getInitialProps', () => {
      let fakeStore = {
        dispatch: function () {},
        getState: function () {
          return {
            jobReports: [mockJob, {id: 3}]
          }
        }
      }

      return Job.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 300}}).then(function (data) {
        expect(data.report).toEqual(mockJob)
      })
    })
  })
})

describe('Job page error handling', () => {
  let fakeStore, wrapper
  beforeAll(() => {
    wrapper = shallow(<Job error={404} />)
  })

  it('returns a 404 error to props', () => {
    fakeStore = {
      dispatch: function () {},
      getState: function () {
        return {
          jobReports: []
        }
      }
    }
    return Job.getInitialProps({store: fakeStore, isServer: true, pathname: '', query: {id: 400}}).then(function (data) {
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
