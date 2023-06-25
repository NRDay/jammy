// PlayButton.tsx
import { usePlayer } from '../../context/player' // Importing usePlayer
import { PlayerProps } from '../../types'

type PlayButtonProps = PlayerProps

const QueueButton: React.FC<PlayButtonProps> = (props) => {
  const { addToPlaylist } = usePlayer()

  return <button onClick={() => addToPlaylist(props)}>Queue</button>
}

export default QueueButton
