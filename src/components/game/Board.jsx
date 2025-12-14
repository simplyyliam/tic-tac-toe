import styled, { css } from 'styled-components';
import { useGame } from '../../context';
import { useSound } from '../../hooks/useSound';



const MarkSvg = styled.svg`
  width: 3rem;
  height: 3rem;

  @media (min-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

function XMark({ isWinning }) {
  return (
    <MarkSvg viewBox="0 0 100 100">
      <path
        d="M20 20 L80 80"
        stroke={isWinning ? '#A855F7' : '#8B5CF6'}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M80 20 L20 80"
        stroke={isWinning ? '#A855F7' : '#8B5CF6'}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </MarkSvg>
  );
}

function OMark({ isWinning }) {
  return (
    <MarkSvg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke={isWinning ? '#D8B4FE' : '#C4B5FD'}
        strokeWidth="10"
        fill="none"
      />
    </MarkSvg>
  );
}


const CellButton = styled.button<{
  isWinning: boolean,
  isEmpty: boolean,
  disabled: boolean
}>`
  aspect-ratio: 1 / 1;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isWinning }) =>
    isWinning ? 'rgba(88,28,135,0.5)' : 'rgba(39,39,42,0.8)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  ${({ isEmpty, disabled }) =>
    isEmpty &&
    !disabled &&
    css`
      &:hover {
        background: rgba(63, 63, 70, 0.8);
        transform: scale(1.02);
      }
    `}

  ${({ disabled, isEmpty }) =>
    disabled &&
    isEmpty &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

function Cell({ value, onClick, isWinning, disabled }) {
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
  );
}


const BoardGrid = styled.div`
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

export default function GameBoard() {
  const {
    board,
    makeMove,
    winningLine,
    winner,
    isDraw,
    isPaused,
    soundEnabled,
  } = useGame();

  const { playMove, playWin, playDraw } = useSound(soundEnabled);

  const handleCellClick = (index) => {
    const result = makeMove(index);

    if (result === 'move') playMove();
    if (result === 'win') playWin();
    if (result === 'draw') playDraw();
  };

  return (
    <BoardGrid>
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => handleCellClick(index)}
          isWinning={winningLine.includes(index)}
          disabled={!!winner || isDraw || isPaused}
        />
      ))}
    </BoardGrid>
  );
}
