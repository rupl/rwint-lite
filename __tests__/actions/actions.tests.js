/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/actions'
import * as actionTypes from '../../constants/actionTypes'
import { mockCountry, mockCountries, mockDisaster, mockDisasters, mockFeatured, mockHeadlines, mockJob, mockJobs,
  mockReports, mockTraining, mockTrainings, mockUpdate } from '../../__fixtures__/data.fixture'

jest.mock('../../services/requests')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Get Updates', () => {
  it('creates GET_REPORTS when has fetched updates and returns the items and info', () => {
    const expectedActions = [{
      type: actionTypes.GET_REPORTS,
      items: mockReports,
      loadMore: false,
      pageNumber: 1,
      pagination: false
    }]
    const store = mockStore({
      reports: {}
    })
    return store.dispatch(actions.getReports()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_REPORTS when load more', () => {
    const expectedActions = [{
      type: actionTypes.GET_REPORTS,
      items: mockReports,
      loadMore: true,
      pageNumber: 2,
      pagination: false
    }]
    const store = mockStore({
      reports: {}
    })
    return store.dispatch(actions.getReports(2, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_REPORTS when load a paginated page', () => {
    const expectedActions = [{
      type: actionTypes.GET_REPORTS,
      items: mockReports,
      loadMore: false,
      pageNumber: 4,
      pagination: true
    }]
    const store = mockStore({
      reports: {}
    })
    return store.dispatch(actions.getReports(4, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_REPORTS if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      reports: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getReports(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_REPORTS if going back to a paginated page', () => {
    const expectedActions = []
    const store = mockStore({
      reports: {}
    })
    return store.dispatch(actions.getReports(5, false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Updates with query', () => {
  it('creates GET_REPORTS when has fetched updates and returns the items, info and isQuery flag', () => {
    const expectedActions = [{
      type: actionTypes.GET_REPORTS,
      items: mockReports,
      loadMore: false,
      pageNumber: 1,
      pagination: false,
      isQuery: true
    }]
    const store = mockStore({
      reports: {}
    })
    return store.dispatch(actions.getReports(1, false, false, 'country.exact:"Syria"')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Featured', () => {
  it('creates GET_FEATURED when has fetched featured and returns the items', () => {
    const expectedActions = [{
      type: actionTypes.GET_FEATURED,
      items: mockFeatured
    }]
    const store = mockStore({
      featured: {}
    })
    return store.dispatch(actions.getFeatured()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_FEATURED if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      featured: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getFeatured()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Headlines', () => {
  it('creates GET_HEADLINES when has fetched headlines and returns the items', () => {
    const expectedActions = [{
      type: actionTypes.GET_HEADLINES,
      items: mockHeadlines
    }]
    const store = mockStore({
      headlines: {}
    })
    return store.dispatch(actions.getHeadlines()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_HEADLINES if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      headlines: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getHeadlines()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get an Update', () => {
  it('creates GET_UPDATE when has fetched update and returns the update', () => {
    const expectedActions = [{
      type: actionTypes.GET_UPDATE,
      item: mockUpdate
    }]
    const store = mockStore({
      updateReports: []
    })
    return store.dispatch(actions.getUpdate(mockUpdate.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_UPDATE when update has already been fetched', () => {
    const expectedActions = []
    const store = mockStore({
      updateReports: [mockUpdate]
    })
    return store.dispatch(actions.getUpdate(mockUpdate.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get a Country', () => {
  it('creates GET_COUNTRY when has fetched country and returns the country', () => {
    const expectedActions = [{
      type: actionTypes.GET_COUNTRY,
      item: mockCountry
    }]
    const store = mockStore({
      countryReports: []
    })
    return store.dispatch(actions.getCountry(mockCountry.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_COUNTRY when country has already been fetched', () => {
    const expectedActions = []
    const store = mockStore({
      countryReports: [mockCountry]
    })
    return store.dispatch(actions.getCountry(mockCountry.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Countries', () => {
  it('creates GET_COUNTRIES when has fetched countries and returns the items', () => {
    const expectedActions = [{
      type: actionTypes.GET_COUNTRIES,
      items: mockCountries
    }]
    const store = mockStore({
      countries: {}
    })
    return store.dispatch(actions.getCountries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_COUNTRIES if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      countries: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getCountries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Disasters', () => {
  it('creates GET_DISASTERS when has fetched updates and returns the items and info', () => {
    const expectedActions = [{
      type: actionTypes.GET_DISASTERS,
      items: mockDisasters,
      loadMore: false,
      pageNumber: 1,
      pagination: false
    }]
    const store = mockStore({
      disasters: {}
    })
    return store.dispatch(actions.getDisasters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_DISASTERS when load more', () => {
    const expectedActions = [{
      type: actionTypes.GET_DISASTERS,
      items: mockDisasters,
      loadMore: true,
      pageNumber: 2,
      pagination: false
    }]
    const store = mockStore({
      disasters: {}
    })
    return store.dispatch(actions.getDisasters(2, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_DISASTERS when load a paginated page', () => {
    const expectedActions = [{
      type: actionTypes.GET_DISASTERS,
      items: mockDisasters,
      loadMore: false,
      pageNumber: 4,
      pagination: true
    }]
    const store = mockStore({
      disasters: {}
    })
    return store.dispatch(actions.getDisasters(4, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_DISASTERS if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      disasters: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getDisasters(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_DISASTERS if going back to a paginated page', () => {
    const expectedActions = []
    const store = mockStore({
      disasters: {}
    })
    return store.dispatch(actions.getDisasters(5, false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Disasters with query', () => {
  it('creates GET_DISASTERS when has fetched disasters and returns the items, info and isQuery flag', () => {
    const expectedActions = [{
      type: actionTypes.GET_DISASTERS,
      items: mockDisasters,
      loadMore: false,
      pageNumber: 1,
      pagination: false,
      isQuery: true
    }]
    const store = mockStore({
      disasters: {}
    })
    return store.dispatch(actions.getDisasters(1, false, false, 'congo')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get a Disaster', () => {
  it('creates GET_DISASTER when has fetched disaster and returns the disaster', () => {
    const expectedActions = [{
      type: actionTypes.GET_DISASTER,
      item: mockDisaster
    }]
    const store = mockStore({
      disasterReports: []
    })
    return store.dispatch(actions.getDisaster(mockDisaster.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_DISASTER when disaster has already been fetched', () => {
    const expectedActions = []
    const store = mockStore({
      disasterReports: [mockDisaster]
    })
    return store.dispatch(actions.getDisaster(mockDisaster.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Jobs', () => {
  it('creates GET_JOBS when has fetched jobs and returns the items and info', () => {
    const expectedActions = [{
      type: actionTypes.GET_JOBS,
      items: mockJobs,
      loadMore: false,
      pageNumber: 1,
      pagination: false
    }]
    const store = mockStore({
      jobs: {}
    })
    return store.dispatch(actions.getJobs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_JOBS when load more', () => {
    const expectedActions = [{
      type: actionTypes.GET_JOBS,
      items: mockJobs,
      loadMore: true,
      pageNumber: 2,
      pagination: false
    }]
    const store = mockStore({
      jobs: {}
    })
    return store.dispatch(actions.getJobs(2, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_JOBS when load a paginated page', () => {
    const expectedActions = [{
      type: actionTypes.GET_JOBS,
      items: mockJobs,
      loadMore: false,
      pageNumber: 4,
      pagination: true
    }]
    const store = mockStore({
      jobs: {}
    })
    return store.dispatch(actions.getJobs(4, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_JOBS if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      jobs: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getJobs(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_REPORTS if going back to a paginated page', () => {
    const expectedActions = []
    const store = mockStore({
      jobs: {}
    })
    return store.dispatch(actions.getJobs(5, false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Jobs with query', () => {
  it('creates GET_JOBS when has fetched jobs and returns the items, info and isQuery flag', () => {
    const expectedActions = [{
      type: actionTypes.GET_JOBS,
      items: mockJobs,
      loadMore: false,
      pageNumber: 1,
      pagination: false,
      isQuery: true
    }]
    const store = mockStore({
      jobs: {}
    })
    return store.dispatch(actions.getJobs(1, false, false, 'congo')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get a Job', () => {
  it('creates GET_JOB when has fetched job and returns the job', () => {
    const expectedActions = [{
      type: actionTypes.GET_JOB,
      item: mockJob
    }]
    const store = mockStore({
      jobReports: []
    })
    return store.dispatch(actions.getJob(mockJob.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_JOB when job has already been fetched', () => {
    const expectedActions = []
    const store = mockStore({
      jobReports: [mockJob]
    })
    return store.dispatch(actions.getJob(mockJob.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Trainings', () => {
  it('creates GET_TRAININGS when has fetched trainings and returns the items and info', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAININGS,
      items: mockTrainings,
      loadMore: false,
      pageNumber: 1,
      pagination: false
    }]
    const store = mockStore({
      trainings: {}
    })
    return store.dispatch(actions.getTrainings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_TRAININGS when load more', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAININGS,
      items: mockTrainings,
      loadMore: true,
      pageNumber: 2,
      pagination: false
    }]
    const store = mockStore({
      trainings: {}
    })
    return store.dispatch(actions.getTrainings(2, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_TRAININGS when load a paginated page', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAININGS,
      items: mockTrainings,
      loadMore: false,
      pageNumber: 4,
      pagination: true
    }]
    const store = mockStore({
      trainings: {}
    })
    return store.dispatch(actions.getTrainings(4, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_TRAININGS if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      trainings: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getTrainings(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_REPORTS if going back to a paginated page', () => {
    const expectedActions = []
    const store = mockStore({
      trainings: {}
    })
    return store.dispatch(actions.getTrainings(5, false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Trainings with query', () => {
  it('creates GET_TRAININGS when has fetched trainings and returns the items, info and isQuery flag', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAININGS,
      items: mockTrainings,
      loadMore: false,
      pageNumber: 1,
      pagination: false,
      isQuery: true
    }]
    const store = mockStore({
      trainings: {}
    })
    return store.dispatch(actions.getTrainings(1, false, false, 'congo')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get a Training', () => {
  it('creates GET_TRAINING when has fetched training and returns the training', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAINING,
      item: mockTraining
    }]
    const store = mockStore({
      trainingReports: []
    })
    return store.dispatch(actions.getTraining(mockTraining.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_TRAINING when training has already been fetched', () => {
    const expectedActions = []
    const store = mockStore({
      trainingReports: [mockTraining]
    })
    return store.dispatch(actions.getTraining(mockTraining.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Handling errors when get a single item', () => {
  it('creates creates the action and returns the error', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAINING,
      error: 404
    }]
    const store = mockStore({
      trainingReports: []
    })
    return store.dispatch(actions.getTraining('error')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Handling errors when get items', () => {
  it('creates creates the action and returns the error', () => {
    const expectedActions = [{
      type: actionTypes.GET_TRAININGS,
      error: 404
    }]
    const store = mockStore({
      trainings: []
    })
    return store.dispatch(actions.getTrainings(100, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
