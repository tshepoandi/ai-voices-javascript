import LyricsDisplay from '../Components/LyricsComponent'
import DownloadButton from '../Components/DownloadButton'
import { useSelector } from 'react-redux'
function DownloadSection() {
  const selectedSong = useSelector((state) => state.song.selectedSong)
  return (
    <div>
      <LyricsDisplay artist={selectedSong.artist} title={selectedSong.title} />
      {/* <DownloadButton voiceId={'EXAVITQu4vr4xnSDxMaL'} /> */}
    </div>
  )
}

export default DownloadSection
