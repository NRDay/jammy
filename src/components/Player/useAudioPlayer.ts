// useAudioPlayer.ts
import { useState, useEffect } from 'react'

export const useAudioPlayer = (audioUrl: string) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const context = new AudioContext()
        setAudioContext(context)

        const response = await fetch(audioUrl)
        const audioData = await response.arrayBuffer()
        const decodedAudioBuffer = await context.decodeAudioData(audioData)
        setAudioBuffer(decodedAudioBuffer)
      } catch (error) {
        console.error('Error initializing audio:', error)
      }
    }

    initializeAudio()

    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close()
      }
    }
  }, [audioUrl])

  const playAudio = () => {
    if (audioContext && audioBuffer) {
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      setAudioSource(source)

      source.start(0)
    }
  }

  return { audioContext, audioBuffer, audioSource, playAudio }
}
