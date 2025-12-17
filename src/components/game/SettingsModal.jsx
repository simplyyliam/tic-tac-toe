import { useState } from 'react'
import styled from 'styled-components'
import { Settings, X, Volume2, VolumeX } from 'lucide-react'
import { useGame, useSound } from '../../hooks'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 40;
  transition: opacity 0.2s;
`

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const ModalContent = styled.div`
  background-color: #18181b;
  border: 1px solid #27272a;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 28rem;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  color: #a1a1aa;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27272a;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const PlayerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const PlayerIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props =>
    props.$xPlayer ? 'rgba(147, 51, 234, 0.2)' : 'rgba(196, 181, 253, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${props => (props.$xPlayer ? '#a855f7' : '#d8b4fe')};
    font-weight: bold;
  }
`

const Input = styled.input`
  flex: 1;
  background-color: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: white;

  &::placeholder {
    color: #71717a;
  }

  &:focus {
    outline: none;
    border-color: #a855f7;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
  }
`

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid #27272a;
`

const ToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  span {
    color: white;
  }
`

const ToggleButton = styled.button`
  width: 3rem;
  height: 1.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  background-color: ${props => (props.$enabled ? '#9333ea' : '#3f3f46')};
  border: none;
  cursor: pointer;
  position: relative;
`

const ToggleCircle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0.125rem;
  transition: transform 0.2s;
  transform: translateX(${props => (props.$enabled ? '1.625rem' : '0.125rem')});
`

const SaveButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #9333ea;
  color: white;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #7e22ce;
  }
`

export default function SettingsModal ({ isOpen, onClose }) {
  const { soundEnabled, toggleSound, players, handleUpdateName, handleGameReset } =
    useGame()

  const { playClick } = useSound(soundEnabled)

  const [player1Name, setPlayer1Name] = useState(players.X.name)
  const [player2Name, setPlayer2Name] = useState(players.O.name)

  const handleSave = () => {
    handleUpdateName('X', player1Name || 'Player 1')
    handleUpdateName('O', player2Name || 'Player 2')
    handleGameReset()
    onClose()
    if (soundEnabled) {
      playClick()
    }
  }

  const handleClose = () => {
    onClose()
    if (soundEnabled) {
      playClick()
    }
  }

  const handleToggleSound = () => {
    toggleSound()
    if (!soundEnabled) playClick()
  }

  if (!isOpen) return null

  return (
    <>
      <Overlay onClick={handleClose} />
      <ModalContainer>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Header>
            <Title>
              <Settings />
              Settings
            </Title>
            <CloseButton onClick={handleClose}>
              <X />
            </CloseButton>
          </Header>

          <Content>
            <Section>
              <SectionTitle>Players</SectionTitle>
              <PlayerInputs>
                <PlayerRow>
                  <PlayerIcon $xPlayer>
                    <span>X</span>
                  </PlayerIcon>
                  <Input
                    type='text'
                    value={player1Name}
                    onChange={e => setPlayer1Name(e.target.value)}
                    placeholder='Player 1'
                  />
                </PlayerRow>
                <PlayerRow>
                  <PlayerIcon>
                    <span>O</span>
                  </PlayerIcon>
                  <Input
                    type='text'
                    value={player2Name}
                    onChange={e => setPlayer2Name(e.target.value)}
                    placeholder='Player 2'
                  />
                </PlayerRow>
              </PlayerInputs>
            </Section>

            <ToggleRow>
              <ToggleLabel>
                {soundEnabled ? (
                  <Volume2 color='#a855f7' />
                ) : (
                  <VolumeX color='#71717a' />
                )}
                <span>Sound Effects</span>
              </ToggleLabel>
              <ToggleButton $enabled={soundEnabled} onClick={handleToggleSound}>
                <ToggleCircle $enabled={soundEnabled} />
              </ToggleButton>
            </ToggleRow>
          </Content>

          <SaveButton onClick={handleSave}>Save & Restart Game</SaveButton>
        </ModalContent>
      </ModalContainer>
    </>
  )
}
