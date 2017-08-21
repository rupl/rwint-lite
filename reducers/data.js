import axios from 'axios';

export const GET_DATA = 'data/GET_DATA'
export const DATA_REQUESTED = 'data/DATA_REQUESTED'

const initialState = {
  items: [],
  gettingData: false,
  gettingItem: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case DATA_REQUESTED:
      return {
        ...state,
        gettingData: true
      }

    case GET_DATA:
      let newItems = action.items ? action.items : [];
      let mergedArr = [...state.items, ...newItems]

      var filteredArr = mergedArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos;
      });

      return {
        ...state,
        items: filteredArr,
        gettingData: !state.gettingData
      }

    default:
      return state
  }
}

const addIdToItems = (items) => {
  items.forEach(item => item.id = items.indexOf(item) + 1)
  return items
}

export const getData = () => {
  return dispatch => {
    dispatch({
      type: DATA_REQUESTED
    })

    axios.get('http://pokeapi.co/api/v2/pokemon/')
      .then(function (response) {
        if (response.data.results) {
          dispatch({
            type: GET_DATA,
            items: addIdToItems(response.data.results)
          })
        }

      })
      .catch(function (error) {
        dispatch({
            type: GET_DATA
        });
      });

  }

}

