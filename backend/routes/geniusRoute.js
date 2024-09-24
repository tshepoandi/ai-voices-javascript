import express from 'express'
import { searchController } from '../controllers/GeniusSongController.js'

const router = express.Router()
router.post('/search', searchController)

export default router
