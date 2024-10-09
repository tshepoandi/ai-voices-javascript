import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LyricsDisplay = ({ artist, title }) => {
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/genius/get-song',
          {
            songId: `${title} ${artist}`,
          },
        )
        setLyrics(response.data.lyrics)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch lyrics')
        setLoading(false)
      }
    }

    fetchLyrics()
  }, [artist, title])

  if (loading) return <div className="text-green-500">Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-black p-6 font-mono">
      <h1 className="text-3xl text-green-500 mb-4">Lyrics Display</h1>
      {lyrics && (
        <div>
          <h2 className="text-2xl text-green-400 mb-2">{title}</h2>
          <p className="text-lg text-green-300 mb-2">Artist: {artist}</p>
          <pre className="whitespace-pre-wrap text-green-500 bg-black p-4 rounded border border-green-500 overflow-auto max-h-[70vh]">
            {lyrics}
          </pre>
        </div>
      )}
    </div>
  )
}

export default LyricsDisplay
