import express from 'express'
import {
  searchController,
  getSongController,
} from '../controllers/GeniusSongController.js'

const router = express.Router()
router.post('/search', searchController)
router.post('/get-song', getSongController)

export default router
