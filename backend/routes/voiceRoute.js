import express from 'express'
import ElevenLabsController from '../controllers/VoicesController.js'

const router = express.Router()
const elevenLabsController = new ElevenLabsController()

router.get('/voices', elevenLabsController.getVoices)
router.post('/text-to-speech', elevenLabsController.createTextToSpeech)

export default router
