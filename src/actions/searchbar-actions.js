import axios from "axios";



export const fetchSearchResults = payload => async dispatch => {
  try {
    const res = await axios.get(`https://www.reddit.com/r/${payload}.json`);
    dispatch({type: 'FETCH_SEARCH_RESULTS_SUCCESS', payload: res.data})
    dispatch({type: 'FETCH_SEARCH_RESULTS_FAILURE', payload: false})
  } catch(error) {
    dispatch({type: 'FETCH_SEARCH_RESULTS_FAILURE', payload: true})
  }
}

export const previousSearches = payload => {
  return {
    type: 'PREVIOUS_SEARCHES',
    payload: payload
  }
}