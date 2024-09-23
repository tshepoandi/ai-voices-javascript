import ElevenLabsAPI from '../utils/ElevenLabsClass.js'
class ElevenLabsController {
  constructor() {
    this.elevenLabsAPI = new ElevenLabsAPI()
    this.getVoices = this.getVoices.bind(this)
    this.createTextToSpeech = this.createTextToSpeech.bind(this)
  }

  async getVoices(req, res) {
    try {
      const voices = await this.elevenLabsAPI.listVoices()
      res.json(voices)
    } catch (error) {
      console.error('Error in getVoices:', error.message)
      res.status(500).json({ error: 'Failed to fetch voices' })
    }
  }

  async createTextToSpeech(req, res) {
    const { text, voiceId, outputPath } = req.body
    try {
      await this.elevenLabsAPI.textToSpeech(text, voiceId, outputPath)
      res.json({ message: `Audio stream saved successfully to ${outputPath}` })
    } catch (error) {
      console.error('Error in createTextToSpeech:', error.message)
      res.status(500).json({ error: 'Failed to create text-to-speech' })
    }
  }
}

export default ElevenLabsController
