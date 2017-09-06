/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import Router from 'next/router'
import { mockDisasters, mockReports } from '../../../__fixtures__/data.fixture'
import ConnectedPaginatedReportsList, { PaginatedReportsList } from '../../../components/lists/PaginatedReportsList.js'
Router['push'] = jest.fn(() => function () {})
const mockGetUpdates = jest.fn(() => function () {})
const mockGetDisasters = jest.fn(() => function () {})

describe('PaginatedReportsList component', () => {
  let container, disastersStore, loadMoreButton, paginationButtons, reportLinks, store, updatesStore, wrapper
  const initialState = {
    disasters: {
      items: mockDisasters.data
    },
    updates: {
      items: mockReports.data
    }
  }
  const mockStore = configureStore()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Connected component', () => {
    beforeAll(() => {
      store = mockStore(initialState)
      container = shallow(<ConnectedPaginatedReportsList store={store} reportsType='update' />)
    })

    it('renders the component', () => {
      expect(container.exists()).toBe(true)
    })

    it('can access the updates from the store', () => {
      expect(container.prop('updates').items).toEqual(mockReports.data)
    })

    it('can access the disasters from the store', () => {
      expect(container.prop('disasters').items).toEqual(mockDisasters.data)
    })
  })

  describe('Updates', () => {
    describe('Renders the updates', () => {
      beforeAll(() => {
        updatesStore = {
          items: mockReports.data,
          focusId: 10
        }
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          reportsType='update' />)
        reportLinks = wrapper.find('ReportLink')
      })

      it('renders the simple component', () => {
        expect(wrapper.exists()).toBe(true)
      })

      it('renders a ReportLink for each report', () => {
        expect(reportLinks.length).toBe(10)
        expect(reportLinks.at(0).prop('report')).toEqual(mockReports.data[0])
        expect(reportLinks.at(0).prop('focusId')).toEqual(10)
        expect(reportLinks.at(0).prop('reportsType')).toEqual('update')
      })
    })

    describe('Show more updates', () => {
      beforeAll(() => {
        updatesStore = {
          currentPage: 1,
          items: mockReports.data
        }
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          getUpdates={mockGetUpdates}
          canLoadMore
          showPagination={false}
          reportsType='update' />)
      })

      it('renders Show more button if can load more updates and not showing pagination buttons', () => {
        loadMoreButton = wrapper.find('LoadMoreButton')
        expect(loadMoreButton.exists()).toBe(true)
        expect(loadMoreButton.prop('nextPage')).toBe(2)
        expect(loadMoreButton.prop('path')).toBe('update')
      })

      it('renders calls the getUpdates action when load more', () => {
        wrapper.instance().loadMore()
        expect(mockGetUpdates).toHaveBeenCalledWith(2, true, false, undefined)
      })
    })

    describe('Pagination buttons', () => {
      beforeAll(() => {
        updatesStore = {
          currentPage: 5,
          items: mockReports.data
        }
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          getUpdates={mockGetUpdates}
          canLoadMore
          showPagination
          reportsType='update' />)
      })

      it('renders pagination buttons if can load more and should show them', () => {
        paginationButtons = wrapper.find('PaginationButtons')
        expect(paginationButtons.exists()).toBe(true)
        expect(paginationButtons.prop('currentPage')).toBe(5)
        expect(paginationButtons.prop('path')).toBe('update')
      })

      it('renders calls the getUpdates action when load next page', () => {
        wrapper.instance().loadNextPage()
        expect(mockGetUpdates).toHaveBeenCalledWith(6, false, true, undefined)
      })

      it('renders calls the getUpdates action when load previous page', () => {
        wrapper.instance().loadPrevPage()
        expect(mockGetUpdates).toHaveBeenCalledWith(4, false, true, undefined)
      })
    })

    describe('Queried reports', () => {
      beforeAll(() => {
        updatesStore = {
          currentPage: 4,
          items: mockReports.data
        }
      })
      it('passes the query to getUpdates when load more', () => {
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          getUpdates={mockGetUpdates}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination={false}
          reportsType='update' />)
        wrapper.instance().loadMore()
        expect(mockGetUpdates).toHaveBeenCalledWith(5, true, false, 'country.exact:"Syria"')
      })

      it('passes the query to getUpdates when load next page', () => {
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          getUpdates={mockGetUpdates}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination
          reportsType='update' />)
        wrapper.instance().loadNextPage()
        expect(mockGetUpdates).toHaveBeenCalledWith(5, false, true, 'country.exact:"Syria"')
      })

      it('passes the query to getUpdates when load previous page', () => {
        wrapper = shallow(<PaginatedReportsList
          updates={updatesStore}
          getUpdates={mockGetUpdates}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination
          reportsType='update' />)
        wrapper.instance().loadPrevPage()
        expect(mockGetUpdates).toHaveBeenCalledWith(3, false, true, 'country.exact:"Syria"')
      })
    })
  })

  describe('Disasters', () => {
    describe('Renders the disasters', () => {
      beforeAll(() => {
        disastersStore = {
          items: mockReports.data,
          focusId: 10
        }
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          reportsType='disaster' />)
        reportLinks = wrapper.find('ReportLink')
      })

      it('renders the simple component', () => {
        expect(wrapper.exists()).toBe(true)
      })

      it('renders a ReportLink for each report', () => {
        expect(reportLinks.length).toBe(10)
        expect(reportLinks.at(0).prop('report')).toEqual(mockReports.data[0])
        expect(reportLinks.at(0).prop('focusId')).toEqual(10)
        expect(reportLinks.at(0).prop('reportsType')).toEqual('disaster')
      })
    })

    describe('Show more disasters', () => {
      beforeAll(() => {
        disastersStore = {
          currentPage: 1,
          items: mockReports.data
        }
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          getDisasters={mockGetDisasters}
          canLoadMore
          showPagination={false}
          reportsType='disaster' />)
      })

      it('renders Show more button if can load more disasters and not showing pagination buttons', () => {
        loadMoreButton = wrapper.find('LoadMoreButton')
        expect(loadMoreButton.exists()).toBe(true)
        expect(loadMoreButton.prop('nextPage')).toBe(2)
        expect(loadMoreButton.prop('path')).toBe('disaster')
      })

      it('renders calls the getDisasters action when load more', () => {
        wrapper.instance().loadMore()
        expect(mockGetDisasters).toHaveBeenCalledWith(2, true, false, undefined)
      })
    })

    describe('Pagination buttons', () => {
      beforeAll(() => {
        disastersStore = {
          currentPage: 5,
          items: mockReports.data
        }
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          getDisasters={mockGetDisasters}
          canLoadMore
          showPagination
          reportsType='disaster' />)
      })

      it('renders pagination buttons if can load more and should show them', () => {
        paginationButtons = wrapper.find('PaginationButtons')
        expect(paginationButtons.exists()).toBe(true)
        expect(paginationButtons.prop('currentPage')).toBe(5)
        expect(paginationButtons.prop('path')).toBe('disaster')
      })

      it('renders calls the getDisasters action when load next page', () => {
        wrapper.instance().loadNextPage()
        expect(mockGetDisasters).toHaveBeenCalledWith(6, false, true, undefined)
      })

      it('renders calls the getDisasters action when load previous page', () => {
        wrapper.instance().loadPrevPage()
        expect(mockGetDisasters).toHaveBeenCalledWith(4, false, true, undefined)
      })
    })

    describe('Queried reports', () => {
      beforeAll(() => {
        disastersStore = {
          currentPage: 4,
          items: mockReports.data
        }
      })
      it('passes the query to getDisasters when load more', () => {
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          getDisasters={mockGetDisasters}
          canLoadMore
          query='Congo'
          showPagination={false}
          reportsType='disaster' />)
        wrapper.instance().loadMore()
        expect(mockGetDisasters).toHaveBeenCalledWith(5, true, false, 'Congo')
      })

      it('passes the query to getDisasters when load next page', () => {
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          getDisasters={mockGetDisasters}
          canLoadMore
          query='Congo'
          showPagination
          reportsType='disaster' />)
        wrapper.instance().loadNextPage()
        expect(mockGetDisasters).toHaveBeenCalledWith(5, false, true, 'Congo')
      })

      it('passes the query to getDisasters when load previous page', () => {
        wrapper = shallow(<PaginatedReportsList
          disasters={disastersStore}
          getDisasters={mockGetDisasters}
          canLoadMore
          query='Congo'
          showPagination
          reportsType='disaster' />)
        wrapper.instance().loadPrevPage()
        expect(mockGetDisasters).toHaveBeenCalledWith(3, false, true, 'Congo')
      })
    })
  })
})
