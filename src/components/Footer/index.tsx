import React from 'react'
import * as FooterStyles from './styled'
import NavigationIcons from '../NavIcons'
import Player from '../Player'
import Playlist from '../Playlist'

import { PlayerProvider } from '../../context/player'

const Footer = () => {
  return (
    <FooterStyles.Container>
      <Player />
      <Playlist />
    </FooterStyles.Container>
  )
}

export default Footer
