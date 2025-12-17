import styled from 'styled-components'
import { useGame } from '../../hooks'


const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  flex-direction: ${props => props.$position === 'left' ? 'row' : 'row-reverse'};
  background-color: ${props => props.$isWinner ? 'rgba(147, 51, 234, 0.3)' : 'rgba(39, 39, 42, 0.8)'};
  border: 2px solid ${props => {
    if (props.$isWinner) return '#a855f7';
    if (props.$isActive) return 'rgba(168, 85, 247, 0.5)';
    return 'transparent';
  }};
  transition: all 0.3s;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -0.25rem;
  right: -0.25rem;
  width: 1rem;
  height: 1rem;
  background-color: #22c55e;
  border-radius: 50%;
  border: 2px solid #18181b;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;

const PlayerInfo = styled.div`
  text-align: ${props => props.$position === 'right' ? 'right' : 'left'};
`;

const PlayerName = styled.p`
  color: white;
  font-weight: 500;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const PlayerStats = styled.p`
  color: #a1a1aa;
  font-size: 0.75rem;
`;

const WinStat = styled.span`
  color: #4ade80;
`;

const LossStat = styled.span`
  color: #f87171;
`;


export default function PlayerCard ({ player, position }) {
  const { players, currentPlayer, winner, isDraw } = useGame()
  const playerData = players[player]
  const isActive = currentPlayer === player && !winner && !isDraw
  const isWinner = winner === player

  return (
    <Card $position={position} $isActive={isActive} $isWinner={isWinner}>
      <AvatarContainer>
        <Avatar src={playerData.avatar} alt={playerData.name} />
        {isActive && <ActiveIndicator />}
      </AvatarContainer>
      
      <PlayerInfo $position={position}>
        <PlayerName>{playerData.name}</PlayerName>
        <PlayerStats>
          <WinStat>W: {playerData.wins}</WinStat>
          {' '}
          <LossStat>L: {playerData.losses}</LossStat>
        </PlayerStats>
      </PlayerInfo>
    </Card>
  )
}
