import styled from 'styled-components'
import { useGame, useSound } from '../../hooks'

const MarkSvg = styled.svg`
  width: 3rem;
  height: 3rem;

  @media (min-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  @media (min-width: 768px) {
    gap: 0.75rem;
    max-width: 380px;
  }
`;

const CellButton = styled.button`
  aspect-ratio: 1;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background-color: ${props => props.$isWinning ? 'rgba(88, 28, 135, 0.5)' : 'rgba(39, 39, 42, 0.8)'};

  ${props => !props.$value && !props.disabled && `
    &:hover {
      background-color: rgba(63, 63, 70, 0.8);
      transform: scale(1.02);
    }
  `}

  ${props => props.disabled && !props.$value && `
    cursor: not-allowed;
    opacity: 0.6;
  `}

  &:active {
    transform: scale(0.95);
  }
`;

function XMark ({ isWinning }) {
  return (
    <MarkSvg viewBox='0 0 100 100'>
      <path
        d='M20 20 L80 80'
        stroke={isWinning ? '#A855F7' : '#8B5CF6'}
        strokeWidth='12'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M80 20 L20 80'
        stroke={isWinning ? '#A855F7' : '#8B5CF6'}
        strokeWidth='12'
        strokeLinecap='round'
        fill='none'
      />
    </MarkSvg>
  )
}

function OMark ({ isWinning }) {
  return (
    <MarkSvg viewBox='0 0 100 100'>
      <circle
        cx='50'
        cy='50'
        r='35'
        stroke={isWinning ? '#D8B4FE' : '#C4B5FD'}
        strokeWidth='10'
        fill='none'
      />
    </MarkSvg>
  )
}


function Cell ({ value, onClick, isWinning, disabled }) {
  return (
    <CellButton
      onClick={onClick}
      disabled={disabled || !!value}
      isWinning={isWinning}
      isEmpty={!value}
    >
      {value === 'X' && <XMark isWinning={isWinning} />}
      {value === 'O' && <OMark isWinning={isWinning} />}
    </CellButton>
  )
}


export default function GameBoard () {
  const {
    board,
    handleMakeMove,
    winningLine,
    winner,
    isDraw,
    isPaused,
    soundEnabled
  } = useGame()

  const { playMove, playWin, playDraw } = useSound(soundEnabled)

  const handleCellClick = index => {
    const result = handleMakeMove(index)

    if (result === 'move') playMove()
    if (result === 'win') playWin()
    if (result === 'draw') playDraw()
  }

  return (
    <GridContainer>
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          onClick={() => handleCellClick(index)}
          isWinning={winningLine.includes(index)}
          disabled={!!winner || isDraw || isPaused}
        />
      ))}
    </GridContainer>
  )
}
