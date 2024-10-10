import { configureStore } from '@reduxjs/toolkit'
import songReducer from '../features/songRetriever/SongSlice'
import lyricsReducer from '../features/lyrics/lyricsReducer'
export default configureStore({
  reducer: {
    song: songReducer,
    lyrics: lyricsReducer,
  },
})
