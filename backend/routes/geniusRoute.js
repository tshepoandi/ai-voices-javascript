import express from 'express'
import { searchController } from '../controllers/GeniusSongController'

const router = express.Router()
router.post('/search', searchController)

export default router
