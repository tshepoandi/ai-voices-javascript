import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background-color: black;
  padding: 1.5rem;
  font-family: monospace;
`

const Title = styled.h1`
  font-size: 1.875rem;
  color: #10b981;
  margin-bottom: 1rem;
`

const SongTitle = styled.h2`
  font-size: 1.5rem;
  color: #34d399;
  margin-bottom: 0.5rem;
`

const ArtistName = styled.p`
  font-size: 1.125rem;
  color: #6ee7b7;
  margin-bottom: 0.5rem;
`

const LyricsContainer = styled.pre`
  white-space: pre-wrap;
  color: #10b981;
  background-color: black;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #10b981;
  overflow: auto;
  max-height: 70vh;
`

const LoadingMessage = styled.div`
  color: #10b981;
`

const ErrorMessage = styled.div`
  color: #ef4444;
`

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

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>
  if (error) return <ErrorMessage>{error}</ErrorMessage>

  return (
    <Container>
      <Title>Lyrics Display</Title>
      {lyrics && (
        <div>
          <SongTitle>{title}</SongTitle>
          <ArtistName>Artist: {artist}</ArtistName>
          <LyricsContainer>{lyrics}</LyricsContainer>
        </div>
      )}
    </Container>
  )
}

export default LyricsDisplay
