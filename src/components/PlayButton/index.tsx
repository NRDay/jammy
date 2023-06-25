// PlayButton.tsx
import { usePlayer } from '../../context/player' // Importing usePlayer
import { PlayerProps } from '../../types'

type PlayButtonProps = PlayerProps

const PlayButton: React.FC<PlayButtonProps> = (props) => {
  const { loadTrack } = usePlayer()

  return <button onClick={() => loadTrack(props)}>Play</button>
}

export default PlayButton
