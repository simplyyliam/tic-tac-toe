import { useGame } from '../../context'
import { useSound } from '../../hooks/useSound'
import styled from 'styled-components'

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

/* Timer pill */
const TimerPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(39, 39, 42, 0.8); /* zinc-800/80 */
  border-radius: 9999px;
`

const TimerText = styled.span`
  color: white;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  font-size: 0.875rem;
`

/* Pause / Play button */
const ControlButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  background: ${({ disabled }) =>
    disabled ? 'rgba(39,39,42,0.5)' : 'rgba(39,39,42,0.8)'};

  color: ${({ disabled }) => (disabled ? '#52525b' : 'white')};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        background: #3f3f46; /* zinc-700 */
      }
    `}
`

export default function GameControlls () {
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
    <Controls>
      <TimerPill>
        <Clock size={16} color='#a1a1aa' />
        <TimerText>{formatTime(timer)}</TimerText>
      </TimerPill>

      <ControlButton onClick={handlePauseClick} disabled={isGameOver}>
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </ControlButton>
    </Controls>
  )
}
