import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Settings, HelpCircle } from 'lucide-react'
import styled from 'styled-components'

import {
  PlayerCard,
  GameControls,
  HowToPlayModal,
  SettingsModal,
  GameOverModal,
  GameBoard
} from '../components'
import { useGame, useModal, useSound } from '../hooks'
import { GameProvider } from '../context'

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #09090b;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(39, 39, 42, 0.8);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3f3f46;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TurnIndicator = styled.div`
  text-align: center;
  padding: 0.5rem 0;
  color: #a1a1aa;
  font-size: 0.875rem;
`

const PausedText = styled.span`
  color: #facc15;
`

const CurrentPlayer = styled.span`
  color: #a855f7;
  font-weight: 600;
`

const MainGameArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`

const GameContainer = styled.div`
  width: 100%;
  max-width: 64rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const PlayerCardWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const BoardColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MobilePlayerCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`

// Component
function GameContent () {
  const {
    handleGameStart,
    gameStarted,
    currentPlayer,
    isPaused,
    soundEnabled
  } = useGame()
  const howToPlayModal = useModal()
  const settingsModal = useModal()
  const { playClick } = useSound(soundEnabled)

  useEffect(() => {
    if (!gameStarted) {
      handleGameStart()
    }
  }, [gameStarted, handleGameStart])

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
      <TopBar>
        <Link to='/'>
          <IconButton onClick={playClick}>
            <Home />
          </IconButton>
        </Link>

        <GameControls />

        <ButtonGroup>
          <IconButton onClick={handleOpenHelp}>
            <HelpCircle />
          </IconButton>
          <IconButton onClick={handleOpenSettings}>
            <Settings />
          </IconButton>
        </ButtonGroup>
      </TopBar>

      <TurnIndicator>
        {isPaused ? (
          <PausedText>Game Paused</PausedText>
        ) : (
          <>
            Current Turn: <CurrentPlayer>{currentPlayer}</CurrentPlayer>
          </>
        )}
      </TurnIndicator>

      <MainGameArea>
        <GameContainer>
          <PlayerCardWrapper>
            <PlayerCard player='X' position='left' />
          </PlayerCardWrapper>

          <BoardColumn>
            <MobilePlayerCards>
              <PlayerCard player='X' position='left' />
              <PlayerCard player='O' position='right' />
            </MobilePlayerCards>

            <GameBoard />
          </BoardColumn>

          <PlayerCardWrapper>
            <PlayerCard player='O' position='right' />
          </PlayerCardWrapper>
        </GameContainer>
      </MainGameArea>

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
