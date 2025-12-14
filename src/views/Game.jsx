import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Settings, HelpCircle } from 'lucide-react'
import styled from 'styled-components'

import {
  PlayerCard,
  GameControlls,
  HowToPlayModal,
  SettingsModal,
  GameOverModal
} from '../components'
import { useGame, useModal, useSound } from '../hooks'
import { GameProvider } from '../context'

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #111; /* equivalent to bg-zinc-950 */
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(38, 38, 38, 0.8); /* bg-zinc-800/80 */
  transition: all 0.2s ease;

  &:hover {
    background-color: #2c2c2c; /* bg-zinc-700 */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.25rem; /* w-5 */
    height: 1.25rem; /* h-5 */
    color: white;
  }
`

const TurnIndicator = styled.div`
  text-align: center;
  padding: 0.5rem 0;
  color: #a1a1aa; /* text-zinc-400 */
  font-size: 0.875rem; /* text-sm */

  span.current-player {
    color: #a855f7; /* text-purple-400 */
    font-weight: 600; /* font-semibold */
  }

  span.paused {
    color: #facc15; /* text-yellow-400 */
  }
`

const MainArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`

const GameWrapper = styled.div`
  width: 100%;
  max-width: 64rem; /* max-w-4xl */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const MobilePlayerCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 20rem; /* max-w-[320px] */
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`

const DesktopPlayerCardWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

// Component
function GameContent () {
  const { startGame, gameStarted, currentPlayer, isPaused, soundEnabled } =
    useGame()
  const howToPlayModal = useModal()
  const settingsModal = useModal()
  const { playClick } = useSound(soundEnabled)

  useEffect(() => {
    if (!gameStarted) {
      startGame()
    }
  }, [gameStarted, startGame])

  const handleOpenSettings = () => {
    playClick()
    settingsModal.open()
  }

  const handleOpenHelp = () => {
    playClick()
    howToPlayModal.open()
  }

  return (
    <Container>
      {/* Top Bar */}
      <TopBar>
        <Link to='/'>
          <IconButton onClick={playClick}>
            <Home />
          </IconButton>
        </Link>

        <GameControlls />

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <IconButton onClick={handleOpenHelp}>
            <HelpCircle />
          </IconButton>
          <IconButton onClick={handleOpenSettings}>
            <Settings />
          </IconButton>
        </div>
      </TopBar>

      {/* Turn Indicator */}
      <TurnIndicator>
        {isPaused ? (
          <span className='paused'>Game Paused</span>
        ) : (
          <>
            Current Turn:{' '}
            <span className='current-player'>{currentPlayer}</span>
          </>
        )}
      </TurnIndicator>

      {/* Main Game Area */}
      <MainArea>
        <GameWrapper>
          <DesktopPlayerCardWrapper>
            <PlayerCard player='X' position='left' />
          </DesktopPlayerCardWrapper>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <MobilePlayerCards>
              <PlayerCard player='X' position='left' />
              <PlayerCard player='O' position='right' />
            </MobilePlayerCards>

            <GameBoard />
          </div>

          <DesktopPlayerCardWrapper>
            <PlayerCard player='O' position='right' />
          </DesktopPlayerCardWrapper>
        </GameWrapper>
      </MainArea>

      {/* Modals */}
      <GameOverModal />
      <HowToPlayModal
        isOpen={howToPlayModal.isOpen}
        onClose={howToPlayModal.close}
        soundEnabled={soundEnabled}
      />
      <SettingsModal
        isOpen={settingsModal.isOpen}
        onClose={settingsModal.close}
      />
    </Container>
  )
}

export default function Game () {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}
