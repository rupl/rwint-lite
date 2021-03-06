/**
 * Redux actions
 */

import * as actionTypes from '../constants/actionTypes'
import { requestCountry, requestCountries, requestDisaster, requestDisasters, requestFeatured, requestHeadlines,
  requestJob, requestJobs, requestTraining, requestTrainings, requestUpdate, requestReports } from '../services/requests'

/**
 * Check if store should be updated based on time since last fetched.
 */
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
  return false
}

const getPaginatedItems = async (actionType, requestFn, offset, loadMore, limit, pageNumber, pagination, query) => {
  let dispatchObj = {}
  let response = await requestFn(offset, limit, query)
  if (typeof response === 'undefined') {
    return {
      type: actionTypes[actionType],
      error: 0
    }
  }
  if (response && response.ok === false) {
    dispatchObj = {
      type: actionTypes[actionType],
      error: response.status
    }
  } else {
    dispatchObj = {
      type: actionTypes[actionType],
      items: response,
      loadMore: loadMore,
      pageNumber: pageNumber,
      pagination: pagination
    }
    if (query) {
      dispatchObj.isQuery = true
    }
  }
  return dispatchObj
}

const getItem = async (dispatch, getState, id, reportsType, requestFn, action) => {
  const reports = getState()[reportsType]
  if (reports) {
    const index = reports.map((x) => { return x.id }).indexOf(id)
    if (index !== -1) {
      return
    }
  }
  let response = await requestFn(id)
  if (typeof response === 'undefined') {
    dispatch({
      type: actionTypes[action],
      error: 0
    })
    return
  }
  if (response && response.ok === false) {
    dispatch({
      type: actionTypes[action],
      error: response.status
    })
    return
  }
  dispatch({
    type: actionTypes[action],
    item: response[0]
  })
}

const shouldFetch = (lastFetched, loadMore, pageNumber, pagination, query) => {
  const goingBackToPaginatedPage = pageNumber > 1 && !loadMore && !pagination
  const shouldRefreshFirstPage = query || (pageNumber === 1 && shouldUpdate(lastFetched))
  // if going back client side or is page one and recently fetched don't re-fetch data
  if ((goingBackToPaginatedPage || (pageNumber === 1 && !shouldRefreshFirstPage))) {
    return false
  }
  return true
}

export const getUpdate = (id) => {
  return async (dispatch, getState) => {
    return getItem(dispatch, getState, id, 'updateReports', requestUpdate, 'GET_UPDATE')
  }
}

export const getReports = (pageNumber = 1, loadMore = false, pagination = false, query, limit = 10) => {
  return async (dispatch, getState) => {
    let offset = (pageNumber - 1) * limit
    if (!shouldFetch(getState().reports.lastFetched, loadMore, pageNumber, pagination, query)) {
      return
    }
    let dispatchObj = await getPaginatedItems('GET_REPORTS', requestReports, offset, loadMore, limit, pageNumber, pagination, query)
    dispatch(dispatchObj)
  }
}

export const getFeatured = () => {
  return async (dispatch, getState) => {
    if (shouldUpdate(getState().featured.lastFetched, 10)) {
      let response = await requestFeatured()
      if (typeof response === 'undefined') {
        dispatch({
          type: actionTypes.GET_FEATURED,
          error: 0
        })
        return
      }
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
      if (typeof response === 'undefined') {
        dispatch({
          type: actionTypes.GET_HEADLINES,
          error: 0
        })
        return
      }
      dispatch({
        type: actionTypes.GET_HEADLINES,
        items: response
      })
    }
  }
}

export const getCountry = (id) => {
  return async (dispatch, getState) => {
    return getItem(dispatch, getState, id, 'countryReports', requestCountry, 'GET_COUNTRY')
  }
}

export const getCountries = () => {
  return async (dispatch, getState) => {
    if (shouldUpdate(getState().countries.lastFetched, 30)) {
      let response = await requestCountries()
      if (typeof response === 'undefined') {
        dispatch({
          type: actionTypes.GET_COUNTRIES,
          error: 0
        })
        return
      }
      dispatch({
        type: actionTypes.GET_COUNTRIES,
        items: response
      })
    }
  }
}

export const getDisaster = (id) => {
  return async (dispatch, getState) => {
    return getItem(dispatch, getState, id, 'disasterReports', requestDisaster, 'GET_DISASTER')
  }
}

export const getDisasters = (pageNumber = 1, loadMore = false, pagination = false, query, limit = 10) => {
  return async (dispatch, getState) => {
    let offset = (pageNumber - 1) * limit
    if (!shouldFetch(getState().disasters.lastFetched, loadMore, pageNumber, pagination, query)) {
      return
    }
    let dispatchObj = await getPaginatedItems('GET_DISASTERS', requestDisasters, offset, loadMore, limit, pageNumber, pagination, query)
    dispatch(dispatchObj)
  }
}

export const getJob = (id) => {
  return async (dispatch, getState) => {
    return getItem(dispatch, getState, id, 'jobReports', requestJob, 'GET_JOB')
  }
}

export const getJobs = (pageNumber = 1, loadMore = false, pagination = false, query, limit = 10) => {
  return async (dispatch, getState) => {
    let offset = (pageNumber - 1) * limit
    if (!shouldFetch(getState().jobs.lastFetched, loadMore, pageNumber, pagination, query)) {
      return
    }
    let dispatchObj = await getPaginatedItems('GET_JOBS', requestJobs, offset, loadMore, limit, pageNumber, pagination, query)
    dispatch(dispatchObj)
  }
}

export const getTraining = (id) => {
  return async (dispatch, getState) => {
    return getItem(dispatch, getState, id, 'trainingReports', requestTraining, 'GET_TRAINING')
  }
}

export const getTrainings = (pageNumber = 1, loadMore = false, pagination = false, query, limit = 10) => {
  return async (dispatch, getState) => {
    let offset = (pageNumber - 1) * limit
    if (!shouldFetch(getState().trainings.lastFetched, loadMore, pageNumber, pagination, query)) {
      return
    }
    let dispatchObj = await getPaginatedItems('GET_TRAININGS', requestTrainings, offset, loadMore, limit, pageNumber, pagination, query)
    dispatch(dispatchObj)
  }
}
