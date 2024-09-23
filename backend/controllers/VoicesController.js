import ElevenLabsAPI from '../utils/ElevenLabsClass.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ElevenLabsController {
  constructor() {
    this.elevenLabsAPI = new ElevenLabsAPI()
    this.getVoices = this.getVoices.bind(this)
    this.createTextToSpeech = this.createTextToSpeech.bind(this)
  }

  async getVoices(req, res) {
    try {
      const voices = await this.elevenLabsAPI.listVoices()
      res.json(
        voices.map((voice) => ({
          voice_id: voice.voice_id,
          name: voice.name,
          description: voice.description,
          labels: voice.labels,
        })),
      )
    } catch (error) {
      console.error('Error in getVoices:', error.message)
      res.status(500).json({ error: 'Failed to fetch voices' })
    }
  }

  async createTextToSpeech(req, res) {
    const { text, voiceId, outputPath } = req.body
    console.log('Received request:', { text, voiceId, outputPath })

    try {
      if (!text || !voiceId || !outputPath) {
        throw new Error('Missing required parameters')
      }

      // Resolve the output path relative to the backend directory
      const fullOutputPath = path.resolve(__dirname, '..', outputPath)
      console.log('Full output path:', fullOutputPath)

      await this.elevenLabsAPI.textToSpeech(text, voiceId, fullOutputPath)
      res.json({
        message: `Audio stream saved successfully to ${fullOutputPath}`,
      })
    } catch (error) {
      console.error('Error in createTextToSpeech:', error)
      // console.error('Error details:', error.response ? .data || 'No additional details');
      res.status(500).json({
        error: 'Failed to create text-to-speech',
        details: error.message,
      })
    }
  }
}

export default ElevenLabsController
