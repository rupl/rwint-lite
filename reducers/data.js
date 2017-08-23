import * as actionTypes from '../constants/actionTypes'

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

export const theInitialState = {
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
