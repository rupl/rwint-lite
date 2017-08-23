/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import ConnectedUpdates, { Updates } from '../../pages/updates.js'

// import {getUpdates} from '../../services/requests'
// jest.mock('../../services/requests')

describe('Updates page', () => {
  let container, store, wrapper
  const mockStore = configureStore()

  const initialState = {
  }

  describe('Connected component', () => {
    beforeAll(function () {
      store = mockStore(initialState)
      container = shallow(<ConnectedUpdates store={store} />)
    })

    it('renders the page', () => {
      expect(container.exists()).toEqual(true)
    })
  })

  describe('Simple component', () => {
    beforeAll(() => {
      wrapper = shallow(<Updates />)
    })

    it('renders the component', () => {
      expect(wrapper.length).toEqual(1)
    })
  })
})

// let wrapper

// describe('Updates page', () => {
//   beforeAll(function () {
//     wrapper = shallow(<App />)
//   })

//   it('renders the page', () => {
//     expect(wrapper.exists()).toEqual(true)
//   })

//   it('calls getUpdates with the default params and return the updates from the request', () => {
//     return App.getInitialProps().then(function (data) {
//       expect(getUpdates.mock.calls.length).toBe(1)
//       expect(getUpdates.mock.calls[0]).toEqual([0, 10])
//       expect(data.currentPage).toEqual(1)
//       expect(data.reports.length).toBe(10)
//       expect(data.reports[0].id).toBe('30')
//     })
//   })

//   describe('paginated pages', () => {
//     it('should get the currentPage from the url and request the reports up to that page client side', () => {
//       return App.getInitialProps({asPath: '/report/listing?page=3'}).then(function (data) {
//         expect(data.currentPage).toEqual(3)
//         expect(getUpdates.mock.calls[1]).toEqual([0, 30])
//       })
//     })

//     it('should get the currentPage from the url and request the reports up to that page server side', () => {
//       return App.getInitialProps({req: {query: {page: 4}}}).then(function (data) {
//         expect(data.currentPage).toEqual(4)
//         expect(getUpdates.mock.calls[2]).toEqual([0, 40])
//       })
//     })
//   })

//   describe('prevent loading large numbers of reports at once', () => {
//     it('should only request one page of reports if would be requesting more than max allowed to request', function () {
//       return App.getInitialProps({req: {query: {page: 11}}}).then(function (data) {
//         expect(data.aboveMax).toBe(true)
//         expect(getUpdates.mock.calls[3]).toEqual([10, 10])
//       })
//     })
//     it('should request multiple pages of reports if beneath the max limit', function () {
//       return App.getInitialProps({req: {query: {page: 4}}}).then(function (data) {
//         expect(data.aboveMax).toBe(false)
//         expect(getUpdates.mock.calls[4]).toEqual([0, 40])
//       })
//     })
//   })

//   describe('loading more reports', () => {
//     it('should set canLoadMore to true if there are more reports to load', () => {
//       return App.getInitialProps().then(function (data) {
//         expect(data.canLoadMore).toBe(true)
//       })
//     })
//     it('should set canLoadMore to false if there are no more reports to load', () => {
//       return App.getInitialProps({req: {query: {page: 3}}}).then(function (data) {
//         expect(data.canLoadMore).toBe(false)
//       })
//     })
//   })
// })
