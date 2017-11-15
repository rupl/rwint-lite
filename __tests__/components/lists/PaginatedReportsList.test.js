/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import Router from 'next/router'
import { mockDisasters, mockJobs, mockReports } from '../../../__fixtures__/data.fixture'
import ConnectedPaginatedReportsList, { PaginatedReportsList } from '../../../components/lists/PaginatedReportsList.js'
Router['push'] = jest.fn(() => function () {})
const mockGetReports = jest.fn(() => function () {})
const mockGetDisasters = jest.fn(() => function () {})
const mockGetJobs = jest.fn(() => function () {})

describe('PaginatedReportsList component', () => {
  let container, disastersStore, jobsStore, loadMoreButton, paginationButtons, reportLinks, store, reportsStore, wrapper
  const initialState = {
    disasters: {
      items: mockDisasters.data
    },
    jobs: {
      items: mockJobs.data
    },
    reports: {
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
      container = shallow(<ConnectedPaginatedReportsList store={store} reportsType='report' />)
    })

    it('renders the component', () => {
      expect(container.exists()).toBe(true)
    })

    it('can access the reports from the store', () => {
      expect(container.prop('reports').items).toEqual(mockReports.data)
    })

    it('can access the disasters from the store', () => {
      expect(container.prop('disasters').items).toEqual(mockDisasters.data)
    })
  })

  describe('Updates', () => {
    describe('Renders the reports', () => {
      beforeAll(() => {
        reportsStore = {
          items: mockReports.data,
          focusId: 10
        }
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          reportsType='report' />)
        reportLinks = wrapper.find('ReportLink')
      })

      it('renders the simple component', () => {
        expect(wrapper.exists()).toBe(true)
      })

      it('renders a ReportLink for each report', () => {
        expect(reportLinks.length).toBe(10)
        expect(reportLinks.at(0).prop('report')).toEqual(mockReports.data[0])
        expect(reportLinks.at(0).prop('focusId')).toEqual(10)
        expect(reportLinks.at(0).prop('reportsType')).toEqual('report')
      })
    })

    describe('Show more reports', () => {
      beforeAll(() => {
        reportsStore = {
          currentPage: 1,
          items: mockReports.data,
          canLoadMore: true
        }
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          getReports={mockGetReports}
          canLoadMore
          showPagination={false}
          reportsType='report' />)
      })

      it('renders Show more button if can load more reports and not showing pagination buttons', () => {
        loadMoreButton = wrapper.find('LoadMoreButton')
        expect(loadMoreButton.exists()).toBe(true)
        expect(loadMoreButton.prop('nextPage')).toBe(2)
        expect(loadMoreButton.prop('path')).toBe('report')
      })

      it('calls the getReports action when load more', () => {
        wrapper.instance().loadMore()
        expect(mockGetReports).toHaveBeenCalledWith(2, true, false, undefined)
      })
    })

    describe('Pagination buttons', () => {
      beforeAll(() => {
        reportsStore = {
          currentPage: 5,
          items: mockReports.data,
          canLoadMore: true
        }
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          getReports={mockGetReports}
          canLoadMore
          showPagination
          reportsType='report' />)
      })

      it('renders pagination buttons if can load more and should show them', () => {
        paginationButtons = wrapper.find('PaginationButtons')
        expect(paginationButtons.exists()).toBe(true)
        expect(paginationButtons.prop('currentPage')).toBe(5)
        expect(paginationButtons.prop('path')).toBe('report')
      })

      it('calls the getReports action when load next page', () => {
        wrapper.instance().loadNextPage()
        expect(mockGetReports).toHaveBeenCalledWith(6, false, true, undefined)
      })

      it('calls the getReports action when load previous page', () => {
        wrapper.instance().loadPrevPage()
        expect(mockGetReports).toHaveBeenCalledWith(4, false, true, undefined)
      })
    })

    describe('Queried reports', () => {
      beforeAll(() => {
        reportsStore = {
          currentPage: 4,
          items: mockReports.data
        }
      })
      it('passes the query to getReports when load more', () => {
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          getReports={mockGetReports}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination={false}
          reportsType='report' />)
        wrapper.instance().loadMore()
        expect(mockGetReports).toHaveBeenCalledWith(5, true, false, 'country.exact:"Syria"')
      })

      it('passes the query to getReports when load next page', () => {
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          getReports={mockGetReports}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination
          reportsType='report' />)
        wrapper.instance().loadNextPage()
        expect(mockGetReports).toHaveBeenCalledWith(5, false, true, 'country.exact:"Syria"')
      })

      it('passes the query to getReports when load previous page', () => {
        wrapper = shallow(<PaginatedReportsList
          reports={reportsStore}
          getReports={mockGetReports}
          canLoadMore
          query='country.exact:"Syria"'
          showPagination
          reportsType='report' />)
        wrapper.instance().loadPrevPage()
        expect(mockGetReports).toHaveBeenCalledWith(3, false, true, 'country.exact:"Syria"')
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
          items: mockReports.data,
          canLoadMore: true
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
          items: mockReports.data,
          canLoadMore: true
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

  describe('Jobs', () => {
    describe('Renders the jobs', () => {
      beforeAll(() => {
        jobsStore = {
          items: mockJobs.data,
          focusId: 10
        }
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          reportsType='job' />)
        reportLinks = wrapper.find('ReportLink')
      })

      it('renders the simple component', () => {
        expect(wrapper.exists()).toBe(true)
      })

      it('renders a ReportLink for each report', () => {
        expect(reportLinks.length).toBe(10)
        expect(reportLinks.at(0).prop('report')).toEqual(mockJobs.data[0])
        expect(reportLinks.at(0).prop('focusId')).toEqual(10)
        expect(reportLinks.at(0).prop('reportsType')).toEqual('job')
      })
    })

    describe('Show more jobs', () => {
      beforeAll(() => {
        jobsStore = {
          currentPage: 1,
          items: mockJobs.data,
          canLoadMore: true
        }
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          getJobs={mockGetJobs}
          canLoadMore
          showPagination={false}
          reportsType='job' />)
      })

      it('renders Show more button if can load more jobs and not showing pagination buttons', () => {
        loadMoreButton = wrapper.find('LoadMoreButton')
        expect(loadMoreButton.exists()).toBe(true)
        expect(loadMoreButton.prop('nextPage')).toBe(2)
        expect(loadMoreButton.prop('path')).toBe('job')
      })

      it('renders calls the getJobs action when load more', () => {
        wrapper.instance().loadMore()
        expect(mockGetJobs).toHaveBeenCalledWith(2, true, false, undefined)
      })
    })

    describe('Pagination buttons', () => {
      beforeAll(() => {
        jobsStore = {
          currentPage: 5,
          items: mockJobs.data,
          canLoadMore: true
        }
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          getJobs={mockGetJobs}
          canLoadMore
          showPagination
          reportsType='job' />)
      })

      it('renders pagination buttons if can load more and should show them', () => {
        paginationButtons = wrapper.find('PaginationButtons')
        expect(paginationButtons.exists()).toBe(true)
        expect(paginationButtons.prop('currentPage')).toBe(5)
        expect(paginationButtons.prop('path')).toBe('job')
      })

      it('renders calls the getJobs action when load next page', () => {
        wrapper.instance().loadNextPage()
        expect(mockGetJobs).toHaveBeenCalledWith(6, false, true, undefined)
      })

      it('renders calls the getJobs action when load previous page', () => {
        wrapper.instance().loadPrevPage()
        expect(mockGetJobs).toHaveBeenCalledWith(4, false, true, undefined)
      })
    })

    describe('Queried reports', () => {
      beforeAll(() => {
        jobsStore = {
          currentPage: 4,
          items: mockJobs.data
        }
      })
      it('passes the query to getJobs when load more', () => {
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          getJobs={mockGetJobs}
          canLoadMore
          query='Congo'
          showPagination={false}
          reportsType='job' />)
        wrapper.instance().loadMore()
        expect(mockGetJobs).toHaveBeenCalledWith(5, true, false, 'Congo')
      })

      it('passes the query to getJobs when load next page', () => {
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          getJobs={mockGetJobs}
          canLoadMore
          query='Congo'
          showPagination
          reportsType='job' />)
        wrapper.instance().loadNextPage()
        expect(mockGetJobs).toHaveBeenCalledWith(5, false, true, 'Congo')
      })

      it('passes the query to getJobs when load previous page', () => {
        wrapper = shallow(<PaginatedReportsList
          jobs={jobsStore}
          getJobs={mockGetJobs}
          canLoadMore
          query='Congo'
          showPagination
          reportsType='job' />)
        wrapper.instance().loadPrevPage()
        expect(mockGetJobs).toHaveBeenCalledWith(3, false, true, 'Congo')
      })
    })
  })
})
