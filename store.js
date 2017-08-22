import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { requestFeatured, requestHeadlines, requestUpdates } from './services/requests'

const theInitialState = {
  featured: {
    lastFetched: '',
    items: []
  },
  headlines: {
    lastFetched: '',
    items: []
  },
  updates: {
    canLoadMore: false,
    currentPage: 1,
    focusId: '',
    lastFetched: '',
    reports: [],
    totalCount: 0
  }
}
const reportsPerPage = 10

export const actionTypes = {
  GET_UPDATES: 'GET_UPDATES',
  LOAD_MORE_UPDATES: 'LOAD_MORE_UPDATES',
  UPDATES_REQUESTED: 'UPDATES_REQUESTED',
  GET_FEATURED: 'GET_FEATURED',
  GET_HEADLINES: 'GET_HEADLINES'
}

// reducers
export const reducer = (state = theInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UPDATES:
      const canLoadMore = action.items.totalCount > (state.updates.currentPage * reportsPerPage)
      const d = action.pagination ? '' : new Date() // dont save last fetched if loading a paginated page
      let newReports = action.loadMore ? [...state.updates.reports, ...action.items.data] : action.items.data
      let focusId = ''

      if (action.loadMore) {
        newReports = removeDuplicates(newReports, 'id')
        focusId = newReports[state.updates.reports.length].id
      }

      let newUpdates = {
        canLoadMore: canLoadMore,
        currentPage: action.pageNumber,
        focusId: focusId,
        lastFetched: d.toString(),
        reports: newReports,
        totalCount: action.items.totalCount
      }

      return {
        ...state,
        updates: newUpdates
      }

    case actionTypes.GET_FEATURED:
      const featuredDate = new Date()
      let newFeatured = {
        lastFetched: featuredDate.toString(),
        items: action.items
      }
      return {
        ...state,
        featured: newFeatured
      }

    case actionTypes.GET_HEADLINES:
      const headlinesDate = new Date()
      let newHeadlines = {
        lastFetched: headlinesDate.toString(),
        items: action.items
      }
      return {
        ...state,
        headlines: newHeadlines
      }

    default: return state
  }
}

// helpers
const shouldUpdate = (lastFetched, threshold = 1) => {
  if (!lastFetched) {
    return true
  }
  const dateNow = new Date()
  const dateFetched = new Date(lastFetched)
  const dateThreshold = dateFetched.setMinutes(dateFetched.getMinutes() + threshold)
  if (dateNow > dateThreshold) {
    return true
  }
}

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

// ACTIONS
export const getUpdates = (pageNumber, loadMore = false, pagination = false) => {
  return async (dispatch, getState) => {
    const limit = 10
    let offset = (pageNumber - 1) * limit
    const goingBackToPaginatedPage = pageNumber > 1 && !loadMore && !pagination
    const shouldRefreshFirstPage = pageNumber === 1 && shouldUpdate(getState().updates.lastFetched)
    // if going back client side or is page one and recently fetched dont re-fetch data
    if (goingBackToPaginatedPage && !shouldRefreshFirstPage) {
      return
    }

    let response = []
    response = await requestUpdates(offset, limit)
    dispatch({
      type: actionTypes.GET_UPDATES,
      items: response,
      loadMore: loadMore,
      pageNumber: pageNumber,
      pagination: pagination
    })
  }
}

export const getFeatured = () => {
  return async (dispatch, getState) => {
    if (shouldUpdate(getState().featured.lastFetched, 10)) {
      let response = await requestFeatured()
      dispatch({
        type: actionTypes.GET_FEATURED,
        items: response
      })
    }
  }
}

export const getHeadlines = () => {
  return async (dispatch, getState) => {
    if (shouldUpdate(getState().headlines.lastFetched, 1)) {
      let response = await requestHeadlines()
      dispatch({
        type: actionTypes.GET_HEADLINES,
        items: response
      })
    }
  }
}

export const initStore = (initialState = theInitialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk))
}
