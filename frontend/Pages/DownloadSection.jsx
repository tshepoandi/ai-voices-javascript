import { useSelector } from 'react-redux'

const DownloadSection = () => {
  const selectedSong = useSelector((state) => state.song.selectedSong)

  // Here you can use the selectedSong data to interact with your Gemini API
  // and fetch lyrics or perform other operations

  return (
    <div>
      <h1>Download Page</h1>
      {selectedSong && (
        <div>
          <h2>{selectedSong.title}</h2>
          <p>Artist: {selectedSong.artist}</p>
          {/* Add more details or functionality here */}
        </div>
      )}
    </div>
  )
}

export default DownloadSection
