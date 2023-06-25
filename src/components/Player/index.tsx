import React, { useRef, useEffect, useState } from 'react'
import { usePlayer } from '../../context/player'

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const { currentTrack, loadNextTrack, loadPreviousTrack } = usePlayer()
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    if (audioRef.current && currentTrack && currentTrack.audioUrl) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.play()
      const handleTimeUpdate = () => {
        if (audioRef.current && currentTrack && currentTrack.previewTimes) {
          const start = parseFloat(currentTrack.previewTimes.start)
          const duration = parseFloat(currentTrack.previewTimes.duration)
          const currentTime = audioRef.current.currentTime + start // Added start offset to currentTime
          const progress = ((currentTime - start) / duration) * 100
          setProgressPercentage(progress)
        }
      }

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
      }
    }
  }, [currentTrack])

  const renderWaveform = () => {
    if (!currentTrack) return

    const { audioPeakData, previewTimes } = currentTrack

    if (!currentTrack || !audioPeakData || !previewTimes) return

    const start = parseFloat(previewTimes.start)
    const duration = parseFloat(previewTimes.duration)
    const wavDuration = parseFloat(previewTimes.wavDuration)

    const previewStartRatio = start / wavDuration
    const previewEndRatio = (start + duration) / wavDuration

    const parsedAudioPeakData = audioPeakData.split(',').map(Number)

    const progressBarPosition =
      previewStartRatio + ((previewEndRatio - previewStartRatio) * progressPercentage) / 100

    return (
      <svg ref={svgRef} width="100%" height="60" onClick={handleWaveformClick}>
        {parsedAudioPeakData.map((peak, index) => (
          <rect
            key={index}
            x={`${(index / parsedAudioPeakData.length) * 100}%`}
            y={`${(1 - peak) * 50}%`}
            width={`${(100 / parsedAudioPeakData.length) * 1.75}%`}
            height={`${peak * 120}px`}
            fill={
              index / parsedAudioPeakData.length >= previewStartRatio &&
              index / parsedAudioPeakData.length <= previewEndRatio
                ? 'blue'
                : 'grey'
            }
          />
        ))}
        <rect x={`${progressBarPosition * 100}%`} y="0" width="2" height="60" fill="red" />
      </svg>
    )
  }

  const handleWaveformClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!currentTrack || !svgRef.current || !audioRef.current) return

    // Get start, duration, and wavDuration as float values from previewTimes
    const { previewTimes } = currentTrack

    if (!currentTrack || !previewTimes) return

    const start = parseFloat(previewTimes.start)
    const duration = parseFloat(previewTimes.duration)
    const wavDuration = parseFloat(previewTimes.wavDuration)

    const rect = svgRef.current.getBoundingClientRect()
    const clickPosition = event.clientX - rect.left
    const percentage = clickPosition / rect.width

    // Calculate the click time based on the total wavDuration, not just the preview duration
    const clickTime = percentage * wavDuration

    // If the clicked time is within the preview times, update the audio currentTime
    // Otherwise, do nothing
    if (clickTime >= start && clickTime <= start + duration) {
      // Offset the currentTime by the start time of the preview
      audioRef.current.currentTime = clickTime - start
    }
    // If outside the playable area, simply return without changing anything
  }

  return (
    <div>
      {currentTrack ? (
        <>
          {renderWaveform()}
          <audio ref={audioRef} controls preload="none" />
          <button onClick={loadPreviousTrack}>Previous</button>
          <button onClick={loadNextTrack}>Next</button>
        </>
      ) : (
        <div>NO TRACK LOADED</div>
      )}
    </div>
  )
}

export default Player
