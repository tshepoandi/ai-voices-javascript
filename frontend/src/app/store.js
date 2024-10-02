import { configureStore } from '@reduxjs/toolkit'
import songReducer from '../features/songRetriever/SongSlice'
export default configureStore({
  reducer: {
    song: songReducer,
  },
})
