import { ElevenLabsClient } from 'elevenlabs'
import dotenv from 'dotenv'
dotenv.config()
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY,
})
const voices = await elevenlabs.voices.getAll()
console.log(voices)
