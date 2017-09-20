import * as actionTypes from '../constants/actionTypes'

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

export const theInitialState = {
  countries: {
    lastFetched: '',
    items: []
  },
  countryReports: [],
  disasters: {
    canLoadMore: false,
    currentPage: 0,
    focusId: '',
    lastFetched: '',
    items: [],
    totalCount: 0
  },
  disasterReports: [],
  featured: {
    lastFetched: '',
    items: []
  },
  headlines: {
    lastFetched: '',
    items: []
  },
  jobs: {
    canLoadMore: false,
    currentPage: 0,
    focusId: '',
    lastFetched: '',
    items: [],
    totalCount: 0
  },
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
    lastFetched: '',
    items: [],
    totalCount: 0
  },
  updateReports: []
}

const getItem = (action, state, type) => {
  let newItems = [...state[type]]
  newItems.push(action.item)
  return {
    ...state,
    [type]: newItems
  }
}

const getItems = (action, state, type) => {
  const d = new Date()
  let newItems = {
    lastFetched: d.toString(),
    items: type === 'featured' ? action.items : action.items.data
  }
  return {
    ...state,
    [type]: newItems
  }
}

const getPaginatedItems = (action, state, type) => {
  const reportsPerPage = 10
  const canLoadMore = action.items.totalCount > (action.pageNumber * reportsPerPage)
  const d = action.pagination || action.isQuery ? '' : new Date() // dont save last fetched if loading a paginated page
  let newItems = action.loadMore ? [...state[type].items, ...action.items.data] : action.items.data
  let focusId = ''
  if (action.loadMore) {
    newItems = removeDuplicates(newItems, 'id')
    focusId = newItems[state[type].items.length].id
  }
  let newObj = {
    canLoadMore: canLoadMore,
    currentPage: action.pageNumber,
    focusId: focusId,
    lastFetched: d.toString(),
    items: newItems,
    totalCount: action.items.totalCount
  }
  return {
    ...state,
    [type]: newObj
  }
}

export const reducer = (state = theInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY:
      return getItem(action, state, 'countryReports')

    case actionTypes.GET_COUNTRIES:
      return getItems(action, state, 'countries')

    case actionTypes.GET_DISASTER:
      return getItem(action, state, 'disasterReports')

    case actionTypes.GET_DISASTERS:
      return getPaginatedItems(action, state, 'disasters')

    case actionTypes.GET_FEATURED:
      return getItems(action, state, 'featured')

    case actionTypes.GET_HEADLINES:
      return getItems(action, state, 'headlines')

    case actionTypes.GET_JOBS:
      return getPaginatedItems(action, state, 'jobs')

    case actionTypes.GET_TRAININGS:
      return getPaginatedItems(action, state, 'trainings')

    case actionTypes.GET_UPDATE:
      return getItem(action, state, 'updateReports')

    case actionTypes.GET_UPDATES:
      return getPaginatedItems(action, state, 'updates')

    default: return state
  }
}
