import * as actionTypes from '../constants/actionTypes'
import { requestFeatured, requestHeadlines, requestUpdates } from '../services/requests'

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

export const getUpdates = (pageNumber = 1, loadMore = false, pagination = false) => {
  return async (dispatch, getState) => {
    const limit = 10
    let offset = (pageNumber - 1) * limit
    const goingBackToPaginatedPage = pageNumber > 1 && !loadMore && !pagination
    const shouldRefreshFirstPage = pageNumber === 1 && shouldUpdate(getState().updates.lastFetched)
    // if going back client side or is page one and recently fetched dont re-fetch data
    if (goingBackToPaginatedPage || (pageNumber === 1 && !shouldRefreshFirstPage)) {
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
