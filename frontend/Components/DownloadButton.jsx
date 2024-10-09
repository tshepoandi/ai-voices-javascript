import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #10b981;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34d399;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }
`

const StatusMessage = styled.p`
  color: #10b981;
  margin-top: 10px;
`

const DownloadButton = ({ voiceId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')
  const lyrics = useSelector((state) => state.lyrics.lyrics)

  const handleDownload = async () => {
    if (!lyrics) {
      setStatus('No lyrics available to generate audio.')
      return
    }

    setIsLoading(true)
    setStatus('Generating script...')

    try {
      // Step 1: Generate script
      const scriptResponse = await axios.post(
        'https://ai-voices-javascript.onrender.com/gemini/script',
        {
          lyrics: lyrics,
        },
      )
      const script = scriptResponse.data.review

      setStatus('Generating audio...')

      // Step 2: Generate audio
      const audioResponse = await axios.post(
        '/api/eleven-labs/text-to-speech',
        {
          text: script,
          voiceId: voiceId,
          outputPath: 'temp_audio.mp3', // This will be ignored as we're not saving to local filesystem
        },
        {
          responseType: 'blob', // Important: This tells axios to treat the response as binary data
        },
      )

      // Step 3: Create a download link
      const url = window.URL.createObjectURL(new Blob([audioResponse.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'generated_audio.mp3')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)

      setStatus('Audio downloaded successfully!')
    } catch (error) {
      console.error('Error:', error)
      setStatus('Failed to generate audio. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleDownload} disabled={isLoading || !lyrics}>
        {isLoading ? 'Processing...' : 'Download Audio'}
      </Button>
      {status && <StatusMessage>{status}</StatusMessage>}
    </div>
  )
}

export default DownloadButton
