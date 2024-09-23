import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

class ElevenLabsAPI {
  constructor() {
    this.apiKey = process.env.ELEVEN_LABS_API_KEY
    this.baseURL = 'https://api.elevenlabs.io/v1'
    this.headers = {
      Accept: 'application/json',
      'xi-api-key': this.apiKey,
    }
  }

  async textToSpeech(text, voiceId, outputPath) {
    const url = `${this.baseURL}/text-to-speech/${voiceId}/stream`
    const data = {
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.7,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true,
      },
    }

    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: this.headers,
        data: data,
        responseType: 'stream',
      })

      const writer = fs.createWriteStream(outputPath)
      response.data.pipe(writer)

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })
    } catch (error) {
      console.error('Error in textToSpeech:', error.message)
      if (error.response) {
        console.error('API response:', error.response.data)
      }
      throw error
    }
  }

  async listVoices() {
    const url = `${this.baseURL}/voices`
    try {
      const response = await axios.get(url, { headers: this.headers })
      return response.data.voices
    } catch (error) {
      console.error('Error in listVoices:', error.message)
      if (error.response) {
        console.error('API response:', error.response.data)
      }
      throw error
    }
  }
}

// Usage example
async function main() {
  const api = new ElevenLabsAPI()

  try {
    // List voices
    const voices = await api.listVoices()
    console.log(
      'Available voices:',
      voices.map((voice) => ({
        voice_id: voice.voice_id,
        name: voice.name,
        description: voice.description,
        labels: voice.labels,
      })),
    )

    const motivation =
      "Today, I want to remind you of something powerful: you are capable of more than you can imagine. Every challenge, every obstacle, every moment of doubt is not a barrier—it's an opportunity. An opportunity to rise, to grow, to evolve into the person you're meant to be."
    // Text to speech
    const TEXT_TO_SPEAK = motivation
    const VOICE_ID = '84Fal4DSXWfp7nJ8emqQ'
    const OUTPUT_PATH = path.join(process.cwd(), 'output.mp3')

    await api.textToSpeech(TEXT_TO_SPEAK, VOICE_ID, OUTPUT_PATH)
    console.log(`Audio stream saved successfully to ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// main()

export default ElevenLabsAPI
