import express from 'express'
import { analyzeSongController } from '../controllers/GeminiController.js'

const router = express.Router()
router.post('/script', analyzeSongController)

export default route
