/* eslint-env jest */
import { reducer } from '../../reducers/data'
import * as actionTypes from '../../constants/actionTypes'
import { mockCountries, mockCountry, mockCountry2, mockDisaster, mockDisaster2, mockDisasters, mockDisastersPage2,
  mockFeatured, mockHeadlines, mockJob, mockJob2, mockJobs, mockJobsPage2, mockReports, mockReportsPage2,
  mockTraining, mockTraining2, mockTrainings, mockTrainingsPage2, mockUpdate, mockUpdate2 } from '../../__fixtures__/data.fixture'

describe('data reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        countries: {
          items: [],
          lastFetched: ''
        },
        countryReports: [],
        disasters: {
          canLoadMore: false,
          currentPage: 0,
          focusId: '',
          items: [],
          lastFetched: '',
          totalCount: 0
        },
        disasterReports: [],
        featured: {
          items: [],
          lastFetched: ''
        },
        headlines: {
          items: [],
          lastFetched: ''
        },
        jobReports: [],
        jobs: {
          canLoadMore: false,
          currentPage: 0,
          focusId: '',
          lastFetched: '',
          items: [],
          totalCount: 0
        },
        trainingReports: [],
        trainings: {
          canLoadMore: false,
          currentPage: 0,
          focusId: '',
          lastFetched: '',
          items: [],
          totalCount: 0
        },
        updates: {
          canLoadMore: false,
          currentPage: 0,
          focusId: '',
          items: [],
          lastFetched: '',
          totalCount: 0
        },
        updateReports: []
      }
    )
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
          items: mockCountries.data,
          lastFetched: d.toString()
        }
      })
    })
  })

  describe('Handle GET_DISASTER', () => {
    it('should handle get disaster', () => {
      expect(
        reducer({disasterReports: []}, {
          type: actionTypes.GET_DISASTER,
          item: mockDisaster
        })
      ).toEqual({
        disasterReports: [mockDisaster]
      })
    })

    it('should store multiple updates', () => {
      expect(
        reducer({disasterReports: [mockDisaster]}, {
          type: actionTypes.GET_DISASTER,
          item: mockDisaster2
        })
      ).toEqual({
        disasterReports: [mockDisaster, mockDisaster2]
      })
    })
  })

  describe('Handle GET_DISASTERS', () => {
    it('should handle Get Disasters', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_DISASTERS,
          items: mockDisasters,
          pageNumber: 1
        })
      ).toEqual({
        disasters: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '',
          items: mockDisasters.data,
          lastFetched: d.toString(),
          totalCount: mockDisasters.totalCount
        }
      })
    })

    it('should set the load more flag', () => {
      const d = new Date()

      expect(
        reducer([], {
          type: actionTypes.GET_DISASTERS,
          items: mockDisasters,
          pageNumber: 3
        })
      ).toEqual({
        disasters: {
          canLoadMore: false,
          currentPage: 3,
          focusId: '',
          items: mockDisasters.data,
          lastFetched: d.toString(),
          totalCount: mockDisasters.totalCount
        }
      })
    })

    it('should remove duplicates and set the focusId if loading more', () => {
      const d = new Date()
      const page2 = [mockDisastersPage2.data[1], mockDisastersPage2.data[2]]

      expect(
        reducer({disasters: {items: mockDisasters.data}}, {
          type: actionTypes.GET_DISASTERS,
          items: mockDisastersPage2,
          loadMore: true,
          pageNumber: 1
        })
      ).toEqual({
        disasters: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '30',
          items: [...mockDisasters.data, ...page2],
          lastFetched: d.toString(),
          totalCount: mockDisastersPage2.totalCount
        }
      })
    })

    it('should not set lastFetched if paginated page', () => {
      expect(
        reducer([], {
          type: actionTypes.GET_DISASTERS,
          items: mockDisasters,
          pageNumber: 2,
          pagination: true
        })
      ).toEqual({
        disasters: {
          canLoadMore: false,
          currentPage: 2,
          focusId: '',
          items: mockDisasters.data,
          lastFetched: '',
          totalCount: mockDisasters.totalCount
        }
      })
    })
  })

  describe('Handle GET_JOB', () => {
    it('should handle get job', () => {
      expect(
        reducer({jobReports: []}, {
          type: actionTypes.GET_JOB,
          item: mockJob
        })
      ).toEqual({
        jobReports: [mockJob]
      })
    })

    it('should store multiple updates', () => {
      expect(
        reducer({jobReports: [mockJob]}, {
          type: actionTypes.GET_JOB,
          item: mockJob2
        })
      ).toEqual({
        jobReports: [mockJob, mockJob2]
      })
    })
  })

  describe('Handle GET_JOBS', () => {
    it('should handle Get Jobs', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_JOBS,
          items: mockJobs,
          pageNumber: 1
        })
      ).toEqual({
        jobs: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '',
          items: mockJobs.data,
          lastFetched: d.toString(),
          totalCount: mockJobs.totalCount
        }
      })
    })

    it('should set the load more flag', () => {
      const d = new Date()

      expect(
        reducer([], {
          type: actionTypes.GET_JOBS,
          items: mockJobs,
          pageNumber: 3
        })
      ).toEqual({
        jobs: {
          canLoadMore: false,
          currentPage: 3,
          focusId: '',
          items: mockJobs.data,
          lastFetched: d.toString(),
          totalCount: mockJobs.totalCount
        }
      })
    })

    it('should remove duplicates and set the focusId if loading more', () => {
      const d = new Date()
      const page2 = [mockJobsPage2.data[1], mockJobsPage2.data[2]]

      expect(
        reducer({jobs: {items: mockJobs.data}}, {
          type: actionTypes.GET_JOBS,
          items: mockJobsPage2,
          loadMore: true,
          pageNumber: 1
        })
      ).toEqual({
        jobs: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '60',
          items: [...mockJobs.data, ...page2],
          lastFetched: d.toString(),
          totalCount: mockJobsPage2.totalCount
        }
      })
    })

    it('should not set lastFetched if paginated page', () => {
      expect(
        reducer([], {
          type: actionTypes.GET_JOBS,
          items: mockJobs,
          pageNumber: 2,
          pagination: true
        })
      ).toEqual({
        jobs: {
          canLoadMore: false,
          currentPage: 2,
          focusId: '',
          items: mockJobs.data,
          lastFetched: '',
          totalCount: mockJobs.totalCount
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
          items: mockHeadlines.data,
          lastFetched: d.toString()
        }
      })
    })
  })

  describe('Handle GET_TRAINING', () => {
    it('should handle get training', () => {
      expect(
        reducer({trainingReports: []}, {
          type: actionTypes.GET_TRAINING,
          item: mockTraining
        })
      ).toEqual({
        trainingReports: [mockTraining]
      })
    })

    it('should store multiple updates', () => {
      expect(
        reducer({trainingReports: [mockTraining]}, {
          type: actionTypes.GET_TRAINING,
          item: mockTraining2
        })
      ).toEqual({
        trainingReports: [mockTraining, mockTraining2]
      })
    })
  })

  describe('Handle GET_TRAININGS', () => {
    it('should handle Get trainings', () => {
      const d = new Date()
      expect(
        reducer([], {
          type: actionTypes.GET_TRAININGS,
          items: mockTrainings,
          pageNumber: 1
        })
      ).toEqual({
        trainings: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '',
          items: mockTrainings.data,
          lastFetched: d.toString(),
          totalCount: mockTrainings.totalCount
        }
      })
    })

    it('should set the load more flag', () => {
      const d = new Date()

      expect(
        reducer([], {
          type: actionTypes.GET_TRAININGS,
          items: mockTrainings,
          pageNumber: 3
        })
      ).toEqual({
        trainings: {
          canLoadMore: false,
          currentPage: 3,
          focusId: '',
          items: mockTrainings.data,
          lastFetched: d.toString(),
          totalCount: mockTrainings.totalCount
        }
      })
    })

    it('should remove duplicates and set the focusId if loading more', () => {
      const d = new Date()
      const page2 = [mockTrainingsPage2.data[1], mockTrainingsPage2.data[2]]

      expect(
        reducer({trainings: {items: mockTrainings.data}}, {
          type: actionTypes.GET_TRAININGS,
          items: mockTrainingsPage2,
          loadMore: true,
          pageNumber: 1
        })
      ).toEqual({
        trainings: {
          canLoadMore: true,
          currentPage: 1,
          focusId: '80',
          items: [...mockTrainings.data, ...page2],
          lastFetched: d.toString(),
          totalCount: mockTrainingsPage2.totalCount
        }
      })
    })

    it('should not set lastFetched if paginated page', () => {
      expect(
        reducer([], {
          type: actionTypes.GET_TRAININGS,
          items: mockTrainings,
          pageNumber: 2,
          pagination: true
        })
      ).toEqual({
        trainings: {
          canLoadMore: false,
          currentPage: 2,
          focusId: '',
          items: mockTrainings.data,
          lastFetched: '',
          totalCount: mockTrainings.totalCount
        }
      })
    })
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
          items: mockReports.data,
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
          items: mockReports.data,
          lastFetched: d.toString(),
          totalCount: mockReports.totalCount
        }
      })
    })

    it('should remove duplicates and set the focusId if loading more', () => {
      const d = new Date()
      const page2 = [mockReportsPage2.data[1], mockReportsPage2.data[2]]

      expect(
        reducer({updates: {items: mockReports.data}}, {
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
          items: [...mockReports.data, ...page2],
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
          items: mockReports.data,
          lastFetched: '',
          totalCount: mockReports.totalCount
        }
      })
    })
  })
})
