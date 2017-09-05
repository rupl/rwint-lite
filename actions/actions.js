import * as actionTypes from '../constants/actionTypes'
import { requestCountry, requestCountries, requestDisasters, requestFeatured, requestHeadlines, requestUpdate, requestUpdates } from '../services/requests'

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
  return false
}

export const getUpdate = (id) => {
  return async (dispatch, getState) => {
    const reports = getState().updateReports
    if (reports) {
      const index = reports.map((x) => { return x.id }).indexOf(id)
      if (index !== -1) {
        return
      }
    }
    let response = await requestUpdate(id)
    dispatch({
      type: actionTypes.GET_UPDATE,
      item: response[0]
    })
  }
}

export const getUpdates = (pageNumber = 1, loadMore = false, pagination = false, query, num = 10) => {
  return async (dispatch, getState) => {
    const limit = num
    let offset = (pageNumber - 1) * limit
    const goingBackToPaginatedPage = pageNumber > 1 && !loadMore && !pagination
    const shouldRefreshFirstPage = query || (pageNumber === 1 && shouldUpdate(getState().updates.lastFetched))
    // if going back client side or is page one and recently fetched dont re-fetch data
    if ((goingBackToPaginatedPage || (pageNumber === 1 && !shouldRefreshFirstPage))) {
      return
    }
    let response = await requestUpdates(offset, limit, query)
    let dispatchObj = {
      type: actionTypes.GET_UPDATES,
      items: response,
      loadMore: loadMore,
      pageNumber: pageNumber,
      pagination: pagination
    }
    if (query) {
      dispatchObj.isQuery = true
    }
    dispatch(dispatchObj)
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

export const getCountry = (id) => {
  return async (dispatch, getState) => {
    const reports = getState().countryReports
    if (reports) {
      const index = reports.map((x) => { return x.id }).indexOf(id)
      if (index !== -1) {
        return
      }
    }
    let response = await requestCountry(id)
    dispatch({
      type: actionTypes.GET_COUNTRY,
      item: response[0]
    })
  }
}

export const getCountries = () => {
  return async (dispatch, getState) => {
    if (shouldUpdate(getState().countries.lastFetched, 30)) {
      let response = await requestCountries()
      dispatch({
        type: actionTypes.GET_COUNTRIES,
        items: response
      })
    }
  }
}

export const getDisasters = (pageNumber = 1, loadMore = false, pagination = false, query, num = 10) => {
  return async (dispatch, getState) => {
    const limit = num
    let offset = (pageNumber - 1) * limit
    const goingBackToPaginatedPage = pageNumber > 1 && !loadMore && !pagination
    const shouldRefreshFirstPage = query || (pageNumber === 1 && shouldUpdate(getState().disasters.lastFetched))
    // if going back client side or is page one and recently fetched dont re-fetch data
    if ((goingBackToPaginatedPage || (pageNumber === 1 && !shouldRefreshFirstPage))) {
      return
    }
    let response = await requestDisasters(offset, limit, query)
    let dispatchObj = {
      type: actionTypes.GET_DISASTERS,
      items: response,
      loadMore: loadMore,
      pageNumber: pageNumber,
      pagination: pagination
    }
    if (query) {
      dispatchObj.isQuery = true
    }
    dispatch(dispatchObj)
  }
}

// TO DO
// Remove duplication
