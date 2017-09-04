/* eslint-env jest */
import { reducer } from '../../reducers/data'
import * as actionTypes from '../../constants/actionTypes'
import { mockCountries, mockCountry, mockCountry2, mockFeatured, mockHeadlines, mockReports, mockReportsPage2,
  mockUpdate, mockUpdate2 } from '../../__fixtures__/data.fixture'

describe('data reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        countries: {
          items: [],
          lastFetched: ''
        },
        countryReports: [],
        featured: {
          items: [],
          lastFetched: ''
        },
        headlines: {
          items: [],
          lastFetched: ''
        },
        updates: {
          canLoadMore: false,
          currentPage: 0,
          focusId: '',
          reports: [],
          lastFetched: '',
          totalCount: 0
        },
        updateReports: []
      }
    )
  })

  describe('Handle GET_UPDATE', () => {
    it('should handle get update', () => {
      expect(
        reducer({updateReports: []}, {
          type: actionTypes.GET_UPDATE,
          item: mockUpdate
        })
      ).toEqual({
        updateReports: [mockUpdate]
      })
    })

    it('should store multiple updates', () => {
      expect(
        reducer({updateReports: [mockUpdate]}, {
          type: actionTypes.GET_UPDATE,
          item: mockUpdate2
        })
      ).toEqual({
        updateReports: [mockUpdate, mockUpdate2]
      })
    })
  })

  describe('Handle GET_UPDATES', () => {
    it('should handle Get Updates', () => {
      const d = new Date()

      expect(
        reducer({}, {
          type: actionTypes.GET_UPDATES,
          items: mockReports,
          pageNumber: 3
        })
      ).toEqual({
        updates: {
          canLoadMore: false,
          currentPage: 3,
          focusId: '',
          reports: mockReports.data,
          lastFetched: d.toString(),
          totalCount: mockReports.totalCount
        }
      })
    })

    it('should set the load more flag', () => {
      const d = new Date()

      expect(
        reducer([], {
          type: actionTypes.GET_UPDATES,
          items: mockReports,
          pageNumber: 1
        })
      ).toEqual({
        updates: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '',
          reports: mockReports.data,
          lastFetched: d.toString(),
          totalCount: mockReports.totalCount
        }
      })
    })

    it('should remove duplicates and set the focusId if loading more', () => {
      const d = new Date()
      const page2 = [mockReportsPage2.data[1], mockReportsPage2.data[2]]

      expect(
        reducer({updates: {reports: mockReports.data}}, {
          type: actionTypes.GET_UPDATES,
          items: mockReportsPage2,
          loadMore: true,
          pageNumber: 1
        })
      ).toEqual({
        updates: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '40',
          reports: [...mockReports.data, ...page2],
          lastFetched: d.toString(),
          totalCount: mockReportsPage2.totalCount
        }
      })
    })

    it('should not set lastFetched if paginated page', () => {
      expect(
        reducer([], {
          type: actionTypes.GET_UPDATES,
          items: mockReports,
          pageNumber: 2,
          pagination: true
        })
      ).toEqual({
        updates: {
          canLoadMore: true,
          currentPage: 2,
          focusId: '',
          reports: mockReports.data,
          lastFetched: '',
          totalCount: mockReports.totalCount
        }
      })
    })
  })

  describe('Handle GET_FEATURED', () => {
    it('should handle Get Featured', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_FEATURED,
          items: mockFeatured
        })
      ).toEqual({
        featured: {
          items: mockFeatured,
          lastFetched: d.toString()
        }
      })
    })
  })

  describe('Handle GET_HEADLINES', () => {
    it('should handle Get Headlines', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_HEADLINES,
          items: mockHeadlines
        })
      ).toEqual({
        headlines: {
          items: mockHeadlines,
          lastFetched: d.toString()
        }
      })
    })
  })

  describe('Handle GET_COUNTRIES', () => {
    it('should handle Get Countries', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_COUNTRIES,
          items: mockCountries
        })
      ).toEqual({
        countries: {
          items: mockCountries,
          lastFetched: d.toString()
        }
      })
    })
  })

  describe('Handle GET_COUNTRY', () => {
    it('should handle get country', () => {
      expect(
        reducer({countryReports: []}, {
          type: actionTypes.GET_COUNTRY,
          item: mockCountry
        })
      ).toEqual({
        countryReports: [mockCountry]
      })
    })

    it('should store multiple updates', () => {
      expect(
        reducer({countryReports: [mockCountry]}, {
          type: actionTypes.GET_COUNTRY,
          item: mockCountry2
        })
      ).toEqual({
        countryReports: [mockCountry, mockCountry2]
      })
    })
  })
})
