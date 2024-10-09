import LyricsDisplay from '../Components/LyricsComponent'
import { useSelector } from 'react-redux'
function DownloadSection() {
  const selectedSong = useSelector((state) => state.song.selectedSong)
  return (
    <div>
      <LyricsDisplay artist={selectedSong.artist} title={selectedSong.title} />
    </div>
  )
}

export default DownloadSection
