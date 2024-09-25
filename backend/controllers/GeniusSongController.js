import genius from 'genius-lyrics'

const apiKey = process.env.GENUIS_API_KEY
const Client = new genius.Client(apiKey)

export const searchController = async (req, res) => {
  try {
    const searches = await Client.songs.search(req.body.search)
    const responseData = searches.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      url: song.url,
      thumbnail: song.thumbnail,
    }))
    res.status(200).json(responseData)
  } catch (error) {
    console.error('Error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getSongController = async (req, res) => {
  try {
    const { songId } = req.body

    if (!songId) {
      console.log('Missing songId in request body')
      return res
        .status(400)
        .json({ error: 'songId is required in the request body' })
    }

    console.log(`Searching for song with ID: ${songId}`)
    const searches = await Client.songs.search(songId)

    if (!searches || searches.length === 0) {
      console.log(`No songs found for ID: ${songId}`)
      return res.status(404).json({ error: 'No songs found' })
    }

    const songMatchingID = searches[0]
    console.log(
      `Found song: ${songMatchingID.title} by ${songMatchingID.artist.name}`,
    )

    const lyrics = await songMatchingID.lyrics()

    if (!lyrics) {
      console.log(`No lyrics found for song: ${songMatchingID.title}`)
      return res.status(404).json({ error: 'No lyrics found for this song' })
    }

    console.log('Successfully retrieved lyrics')
    res.status(200).json({ lyrics })
  } catch (error) {
    console.error('Error in getSongController:', error)

    if (error instanceof TypeError) {
      return res.status(400).json({ error: 'Invalid input or API response' })
    }

    if (error.name === 'InvalidTypeError') {
      return res.status(400).json({ error: 'Invalid search query type' })
    }

    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
}
