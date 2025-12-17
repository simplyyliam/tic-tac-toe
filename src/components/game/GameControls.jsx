import { Pause, Play, Clock } from 'lucide-react'

import styled from 'styled-components'
import { useGame, useSound } from '../../hooks'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(39, 39, 42, 0.8);
  border-radius: 9999px;

  svg {
    width: 1rem;
    height: 1rem;
    color: #a1a1aa;
  }
`;

const TimeText = styled.span`
  color: white;
  font-family: monospace;
  font-size: 0.875rem;
`;

const PauseButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? 'rgba(39, 39, 42, 0.5)' : 'rgba(39, 39, 42, 0.8)'};
  color: ${props => props.disabled ? '#52525b' : 'white'};

  &:hover {
    background-color: ${props => props.disabled ? 'rgba(39, 39, 42, 0.5)' : '#3f3f46'};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;


export default function GameControls () {
  const { timer, isPaused, handleGamePause, winner, isDraw, soundEnabled } =
    useGame()
  const { playClick } = useSound(soundEnabled)

  function formatTime (seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handlePauseClick = () => {
    playClick()
    handleGamePause()
  }

  const isGameOver = winner || isDraw

  return (
    <Container>
      <TimerDisplay>
        <Clock />
        <TimeText>{formatTime(timer)}</TimeText>
      </TimerDisplay>
      
      <PauseButton onClick={handlePauseClick} disabled={isGameOver}>
        {isPaused ? <Play /> : <Pause />}
      </PauseButton>
    </Container>
  )
}
