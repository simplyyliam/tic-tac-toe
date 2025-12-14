
import styled from 'styled-components';
import { Trophy, Handshake, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGame } from '../../context';
import { useSound } from '../../hooks/useSound';



const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 40;
  transition: opacity 0.2s ease;
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;



const Card = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 2rem;
  text-align: center;
  border-radius: 1.5rem;
  background: linear-gradient(to bottom, #18181b, #09090b);
  border: 1px solid #27272a;
`;



const IconBadge = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0 auto 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WinnerBadge = styled(IconBadge)`
  background: linear-gradient(to bottom right, #a855f7, #7e22ce);
`;

const DrawBadge = styled(IconBadge)`
  background: linear-gradient(to bottom right, #52525b, #3f3f46);
`;



const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const WinnerName = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: #c084fc;
  margin-bottom: 1.5rem;
`;

const DrawText = styled.p`
  font-size: 1.125rem;
  color: #a1a1aa;
  margin-bottom: 1.5rem;
`;



const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const PlayAgainButton = styled(ActionButton)`
  background: #9333ea;

  &:hover {
    background: #7e22ce;
  }
`;

const HomeButton = styled(Link)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
  background: #27272a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #3f3f46;
  }
`;

export default function GameOverModal() {
  const { winner, isDraw, players, resetGame, soundEnabled } = useGame();
  const { playClick } = useSound(soundEnabled);

  const isOpen = winner || isDraw;

  const handleReset = () => {
    playClick();
    resetGame();
  };

  const handleHomeClick = () => {
    playClick();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay />

      <Wrapper>
        <Card>
          {winner ? (
            <>
              <WinnerBadge>
                <Trophy size={40} color="white" />
              </WinnerBadge>

              <Title>Winner!</Title>
              <WinnerName>{players[winner].name}</WinnerName>
            </>
          ) : (
            <>
              <DrawBadge>
                <Handshake size={40} color="white" />
              </DrawBadge>

              <Title>It&apos;s a Draw!</Title>
              <DrawText>Well played, both of you!</DrawText>
            </>
          )}

          <Actions>
            <PlayAgainButton onClick={handleReset}>
              <RotateCcw size={20} />
              Play Again
            </PlayAgainButton>

            <HomeButton
              to="/"
              onClick={handleHomeClick}
            >
              <Home size={20} />
              Home
            </HomeButton>
          </Actions>
        </Card>
      </Wrapper>
    </>
  );
}
