import React, { useState } from 'react'
import PlayButton from '../PlayButton'
import { usePlayer } from '../../context/player'

const Playlist: React.FC = () => {
  const { playlist, loadTrack, removeFromPlaylist } = usePlayer()
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setIsPlaylistVisible(!isPlaylistVisible)}>
        {isPlaylistVisible ? 'Hide' : 'Show'} Playlist
      </button>

      {isPlaylistVisible && (
        <div>
          <h3>Playlist</h3>
          <ul>
            {playlist.map((track, index: number) => (
              <li key={index}>
                {track.product_name} - {track.product_price}
                <PlayButton
                  product_id={track.product_id}
                  audioUrl={track.audioUrl || ''}
                  audioPeakData={track.audioPeakData || ''}
                  previewTimes={{
                    start: track.previewTimes?.start || '0',
                    duration: track.previewTimes?.duration || '0',
                    wavDuration: track.previewTimes?.wavDuration || '0',
                  }}
                />
                <button onClick={() => removeFromPlaylist(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Playlist
