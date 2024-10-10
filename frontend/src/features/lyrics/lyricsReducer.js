const initialState = {
  lyrics: '',
  loading: false,
  error: null,
}

function lyricsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LYRICS_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_LYRICS_SUCCESS':
      return { ...state, loading: false, lyrics: action.payload }
    case 'FETCH_LYRICS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default lyricsReducer
