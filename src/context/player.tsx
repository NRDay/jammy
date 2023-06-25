import React, { createContext, useContext, useState, useEffect } from 'react'
import { PlayerProps, Playlist as PlaylistType, Track } from '../types'

type PlayerContextType = {
  currentTrack: PlayerProps | null
  playlist: Track[]
  loadTrack: (props: PlayerProps) => void
  addToPlaylist: (track: PlayerProps) => void
  removeFromPlaylist: (index: number) => void
  loadNextTrack: () => void
  loadPreviousTrack: () => void
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

export const PlayerProvider: React.FC = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<PlayerProps | null>(null)
  const [playlist, setPlaylist] = useState<Track[]>([])

  useEffect(() => {
    // Load playlist from local storage initially
    const savedPlaylist = localStorage.getItem('playlist')
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist))
    }
  }, [])
  // fetch from api/tracks using currentTrack.product_id

  const loadTrack = async (props: PlayerProps) => {
    if (props && props.product_id) {
      try {
        // Fetch from api/tracks using currentTrack.product_id
        const req = await fetch(
          `https://itl.jorisgroup.net/wp-json/itl/v1/track/${props.product_id}`,
        )
        const res = await req.json()
        console.log('res', res)
        const updatedProps = {
          ...props,
          // Overwrite or add the properties you want to update here.
          // For example, if you want to update a property called 'trackData':
          audioPeakData: res.wave_json,
          previewTimes: res.preview_times,
        }
        console.log('updatedProps', updatedProps)
        setCurrentTrack(updatedProps)
      } catch (error) {
        console.error('Error fetching track:', error)
      }
    } else {
      setCurrentTrack(props)
    }
  }

  const addToPlaylist = (track: Track) => {
    const newPlaylist = [...playlist, track]
    setPlaylist(newPlaylist)
    localStorage.setItem('playlist', JSON.stringify(newPlaylist))
  }

  const removeFromPlaylist = (index: number) => {
    const newPlaylist = playlist.filter((_, idx) => idx !== index)
    setPlaylist(newPlaylist)
    localStorage.setItem('playlist', JSON.stringify(newPlaylist))
  }

  const loadNextTrack = () => {
    if (!currentTrack) return

    const currentIndex = playlist.findIndex((track) => track.product_id === currentTrack.product_id)
    const nextIndex = currentIndex + 1
    if (nextIndex < playlist.length) {
      const nextTrack = playlist[nextIndex]
      setCurrentTrack({
        audioUrl: nextTrack.audioUrl || '',
        audioPeakData: nextTrack.audioPeakData || '',
        previewTimes: {
          start: nextTrack.previewTimes?.start || '0',
          duration: nextTrack.previewTimes?.duration || '0',
          wavDuration: nextTrack.previewTimes?.wavDuration || '0',
        },
        product_id: nextTrack.product_id,
      })
    }
  }

  const loadPreviousTrack = () => {
    if (!currentTrack) return

    const currentIndex = playlist.findIndex((track) => track.product_id === currentTrack.product_id)
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      const prevTrack = playlist[prevIndex]
      setCurrentTrack({
        audioUrl: prevTrack.audioUrl || '',
        audioPeakData: prevTrack.audioPeakData || '',
        previewTimes: {
          start: prevTrack.previewTimes?.start || '0',
          duration: prevTrack.previewTimes?.duration || '0',
          wavDuration: prevTrack.previewTimes?.wavDuration || '0',
        },
        product_id: prevTrack.product_id,
      })
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playlist,
        loadTrack,
        addToPlaylist,
        removeFromPlaylist,
        loadNextTrack,
        loadPreviousTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
