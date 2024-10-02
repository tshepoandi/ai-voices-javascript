import { useSelector } from 'react-redux'

const DownloadSection = () => {
  const selectedSong = useSelector((state) => state.song.selectedSong)

  return (
    <div>
      <h1>Download Page</h1>
      {selectedSong && (
        <div>
          <h2>{selectedSong.title}</h2>
          <p>Artist: {selectedSong.artist}</p>
        </div>
      )}
    </div>
  )
}

export default DownloadSection
