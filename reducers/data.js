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
    currentPage: 0,
    focusId: '',
    lastFetched: '',
    items: [],
    totalCount: 0
  },
  updateReports: []
}
const reportsPerPage = 10

export const reducer = (state = theInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UPDATE:
      let newUpdateReports = [...state.updateReports]
      newUpdateReports.push(action.item)
      return {
        ...state,
        updateReports: newUpdateReports
      }

    case actionTypes.GET_UPDATES:
      const canLoadMore = action.items.totalCount > (action.pageNumber * reportsPerPage)
      const d = action.pagination || action.isQuery ? '' : new Date() // dont save last fetched if loading a paginated page
      let newReports = action.loadMore ? [...state.updates.items, ...action.items.data] : action.items.data
      let focusId = ''

      if (action.loadMore) {
        newReports = removeDuplicates(newReports, 'id')
        focusId = newReports[state.updates.items.length].id
      }

      let newUpdates = {
        canLoadMore: canLoadMore,
        currentPage: action.pageNumber,
        focusId: focusId,
        lastFetched: d.toString(),
        items: newReports,
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

    case actionTypes.GET_COUNTRY:
      let newCountryReports = [...state.countryReports]
      newCountryReports.push(action.item)
      return {
        ...state,
        countryReports: newCountryReports
      }

    case actionTypes.GET_COUNTRIES:
      const countriesDate = new Date()
      let newCountries = {
        lastFetched: countriesDate.toString(),
        items: action.items
      }
      return {
        ...state,
        countries: newCountries
      }

    case actionTypes.GET_DISASTERS:
      const canLoadMoreDisasters = action.items.totalCount > (action.pageNumber * reportsPerPage)
      const dateDiasters = action.pagination || action.isQuery ? '' : new Date() // dont save last fetched if loading a paginated page
      let newItems = action.loadMore ? [...state.disasters.items, ...action.items.data] : action.items.data
      let focusIdDisasters = ''

      if (action.loadMore) {
        newItems = removeDuplicates(newItems, 'id')
        focusIdDisasters = newItems[state.disasters.items.length].id
      }

      let newDisasters = {
        canLoadMore: canLoadMoreDisasters,
        currentPage: action.pageNumber,
        focusId: focusIdDisasters,
        lastFetched: dateDiasters.toString(),
        items: newItems,
        totalCount: action.items.totalCount
      }

      return {
        ...state,
        disasters: newDisasters
      }

    default: return state
  }
}
