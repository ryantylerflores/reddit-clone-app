const INITIAL_STATE = {
  prevSearches: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'FETCH_SEARCH_RESULTS_SUCCESS':
      return { 
        ...state, 
        searchResults: action.payload.data.children 
      }
    case 'FETCH_SEARCH_RESULTS_FAILURE':
      return {
        ...state,
        error: action.payload
      }
    case 'PREVIOUS_SEARCHES':
      // Checks for unique searches & adds to state
      if (!state.prevSearches.includes(action.payload))
      {
        return { 
          ...state, 
          prevSearches: [...state.prevSearches, action.payload] 
        }
      } else {
        return state
      }
    default:
      return state;
  }
}