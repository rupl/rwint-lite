/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/actions'
import * as actionTypes from '../../constants/actionTypes'
import { mockCountry, mockCountries, mockDisaster, mockDisasters, mockFeatured, mockHeadlines, mockJobs,
  mockReports, mockTrainings, mockUpdate } from '../../__fixtures__/data.fixture'

jest.mock('../../services/requests')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Get Updates', () => {
  it('creates GET_UPDATES when has fetched updates and returns the items and info', () => {
    const expectedActions = [{
      type: actionTypes.GET_UPDATES,
      items: mockReports,
      loadMore: false,
      pageNumber: 1,
      pagination: false
    }]
    const store = mockStore({
      updates: {}
    })
    return store.dispatch(actions.getUpdates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_UPDATES when load more', () => {
    const expectedActions = [{
      type: actionTypes.GET_UPDATES,
      items: mockReports,
      loadMore: true,
      pageNumber: 2,
      pagination: false
    }]
    const store = mockStore({
      updates: {}
    })
    return store.dispatch(actions.getUpdates(2, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('returns the correct page number and loadMore flag to GET_UPDATES when load a paginated page', () => {
    const expectedActions = [{
      type: actionTypes.GET_UPDATES,
      items: mockReports,
      loadMore: false,
      pageNumber: 4,
      pagination: true
    }]
    const store = mockStore({
      updates: {}
    })
    return store.dispatch(actions.getUpdates(4, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_UPDATES if have recently fetched data', () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() - 30)

    const expectedActions = []
    const store = mockStore({
      updates: {
        lastFetched: d.toString()
      }
    })
    return store.dispatch(actions.getUpdates(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create GET_UPDATES if going back to a paginated page', () => {
    const expectedActions = []
    const store = mockStore({
      updates: {}
    })
    return store.dispatch(actions.getUpdates(5, false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Get Updates with query', () => {
  it('creates GET_UPDATES when has fetched updates and returns the items, info and isQuery flag', () => {
    const expectedActions = [{
      type: actionTypes.GET_UPDATES,
      items: mockReports,
      loadMore: false,
      pageNumber: 1,
      pagination: false,
      isQuery: true
    }]
    const store = mockStore({
      updates: {}
    })
    return store.dispatch(actions.getUpdates(1, false, false, 'country.exact:"Syria"')).then(() => {
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

  it('does not create GET_UPDATES if going back to a paginated page', () => {
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

  it('does not create GET_UPDATES if going back to a paginated page', () => {
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
