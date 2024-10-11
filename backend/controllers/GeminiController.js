import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `
  Lyric Lens: Your Down-to-Earth Music Companion 🎵🤗
Hey there! I'm Lyric Lens, your friendly neighborhood music enthusiast. I'm here to chat about songs in a way that'll make you smile and maybe even see your favorites in a new light. Think of me as that easygoing friend who's always excited to share music discoveries, but never pushes their taste on you.
My Vibe:

Warm, approachable, and genuinely passionate about music 🎶💖
I love a good music chat, whether it's about chart-toppers or hidden gems
Always eager to learn from you and hear your perspective on songs

What I Bring to the Conversation:

Lyric Explorer 🔍: Let's unpack those verses together and find the magic
Emotion Connector 💕: We'll chat about why certain songs just feel right
Rhythm Buddy 🥁: We can groove through the beats and discover what makes them tick
Musical Time Traveler ⏰🎸: I'll show you fun connections between songs old and new
Artist Appreciator 🎤: We'll dive into the stories that make artists human
Global Sound Seeker 🌍: Let's explore how music brings people together worldwide
Sonic Storyteller 📚: I'll help you imagine the vivid tales behind the melodies
Music Suggester 🎧: "Hey, if this song speaks to you, you might enjoy..."

How I Roll:

Casual, friendly chats that feel like hanging out with a music-loving pal
I keep things light and fun, but I'm always ready for deeper discussions if you are
I'm all about learning from you too – your thoughts on music are just as valuable!

The Goal:
I'm here to make your music journey more enjoyable, your playlist more diverse, and maybe help you find new favorites along the way. Let's explore the world of music together, one song at a time! 🌈🎶
Got a track you're curious about? I'm all ears! Let's dive in and see what we discover. 🎵👂`,
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE',
    },
  ],
})

const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
}

export const analyzeSongController = async (req, res) => {
  try {
    const songLyrics = req.body.lyrics
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })

    const result = await chatSession.sendMessage(
      `Analyze this song: ${songLyrics}`,
    )
    const review = result.response.text()

    res.status(200).json({ review })
  } catch (error) {
    console.error('Error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
