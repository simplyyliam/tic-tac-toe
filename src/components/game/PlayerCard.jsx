import styled from 'styled-components'
import { useGame } from '../../hooks'


const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  background: ${({ isWinner }) =>
    isWinner ? 'rgba(147,51,234,0.3)' : 'rgba(39,39,42,0.8)'};
  transition: all 0.3s ease;

  ${({ position }) =>
    position === 'right'
      ? 'flex-direction: row-reverse;'
      : 'flex-direction: row;'}

  ${({ isWinner }) =>
    isWinner &&
    `
      box-shadow: 0 0 0 2px #a855f7;
    `}

  ${({ isActive, isWinner }) =>
    isActive &&
    !isWinner &&
    `
      box-shadow: 0 0 0 2px rgba(192,132,252,0.5);
    `}
`

const AvatarWrapper = styled.div`
  position: relative;
`

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`

const ActiveDot = styled.div`
  position: absolute;
  bottom: -0.25rem;
  right: -0.25rem;
  width: 1rem;
  height: 1rem;
  background: #22c55e;
  border-radius: 9999px;
  border: 2px solid #18181b;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.6;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const Info = styled.div`
  text-align: ${({ position }) => (position === 'right' ? 'right' : 'left')};
`

const Name = styled.p`
  color: white;
  font-weight: 500;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const Stats = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
`

const Wins = styled.span`
  color: #4ade80;
`

const Losses = styled.span`
  color: #f87171;
`

export default function PlayerCard ({ player, position }) {
  const { players, currentPlayer, winner, isDraw } = useGame()
  const playerData = players[player]
  const isActive = currentPlayer === player && !winner && !isDraw
  const isWinner = winner === player

  return (
    <Card position={position} isActive={isActive} isWinner={isWinner}>
      <AvatarWrapper>
        <Avatar src={playerData.avatar} alt={playerData.name} />
        {isActive && <ActiveDot />}
      </AvatarWrapper>

      <Info position={position}>
        <Name>{playerData.name}</Name>
        <Stats>
          <Wins>W: {playerData.wins}</Wins>{' '}
          <Losses>L: {playerData.losses}</Losses>
        </Stats>
      </Info>
    </Card>
  )
}
