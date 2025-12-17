
import styled from 'styled-components';
import { Trophy, Handshake, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGame, useSound } from '../../hooks';



const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 40;
  transition: opacity 0.2s;
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: linear-gradient(to bottom, #18181b, #09090b);
  border: 1px solid #27272a;
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 24rem;
  width: 100%;
  text-align: center;
`;

const IconCircle = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-center;
  background: ${props => props.$winner 
    ? 'linear-gradient(to bottom right, #a855f7, #7c3aed)'
    : 'linear-gradient(to bottom right, #52525b, #3f3f46)'};

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: white;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: ${props => props.$large ? '1.25rem' : '1.125rem'};
  font-weight: ${props => props.$medium ? '500' : '400'};
  color: ${props => props.$purple ? '#c084fc' : '#a1a1aa'};
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.$primary ? '#9333ea' : '#27272a'};
  color: white;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$primary ? '#7e22ce' : '#3f3f46'};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
      <ModalContainer>
        <ModalContent>
          {winner ? (
            <>
              <IconCircle $winner>
                <Trophy />
              </IconCircle>
              <Title>Winner!</Title>
              <Subtitle $purple $large $medium>
                {players[winner].name}
              </Subtitle>
            </>
          ) : (
            <>
              <IconCircle>
                <Handshake />
              </IconCircle>
              <Title>It's a Draw!</Title>
              <Subtitle $large>
                Well played, both of you!
              </Subtitle>
            </>
          )}

          <ButtonGroup>
            <Button $primary onClick={handleReset}>
              <RotateCcw />
              Play Again
            </Button>
            <StyledLink to="/" onClick={handleHomeClick}>
              <Button>
                <Home />
                Home
              </Button>
            </StyledLink>
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </>
  );
}
