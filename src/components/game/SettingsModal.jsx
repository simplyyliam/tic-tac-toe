import { useState } from 'react';
import styled from 'styled-components';
import { Settings, X, Volume2, VolumeX } from 'lucide-react';
import { useGame, useSound } from '../../hooks';


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
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
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
`;

const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #27272a;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 500;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PlayerBadge = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ variant }) =>
    variant === 'X' ? 'rgba(147,51,234,0.2)' : 'rgba(192,132,252,0.2)'};
  color: ${({ variant }) =>
    variant === 'X' ? '#c084fc' : '#d8b4fe'};
  font-weight: 700;
`;

const Input = styled.input`
  flex: 1;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: white;

  &::placeholder {
    color: #71717a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a855f7;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid #27272a;
`;

const ToggleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
`;

const ToggleButton = styled.button`
  width: 3rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${({ enabled }) => (enabled ? '#9333ea' : '#3f3f46')};
  position: relative;
  transition: background-color 0.2s ease;
`;

const ToggleKnob = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background: white;
  border-radius: 9999px;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  transform: ${({ enabled }) =>
    enabled ? 'translateX(1.625rem)' : 'translateX(0)'};
  transition: transform 0.2s ease;
`;

const SaveButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #9333ea;
  color: white;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #7e22ce;
  }
`;

export default function SettingsModal({ isOpen, onClose }) {
  const {
    soundEnabled,
    toggleSound,
    players,
    updatePlayerName,
    resetGame,
  } = useGame();

  const { playClick } = useSound(soundEnabled);

  const [player1Name, setPlayer1Name] = useState(players.X.name);
  const [player2Name, setPlayer2Name] = useState(players.O.name);

  const handleSave = () => {
    playClick();
    updatePlayerName('X', player1Name || 'Player 1');
    updatePlayerName('O', player2Name || 'Player 2');
    resetGame();
    onClose();
  };

  const handleClose = () => {
    playClick();
    onClose();
  };

  const handleToggleSound = () => {
    toggleSound();
    if (!soundEnabled) playClick();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <Wrapper>
        <Card onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>
              <Settings size={20} />
              Settings
            </Title>
            <CloseButton onClick={handleClose}>
              <X size={20} color="#a1a1aa" />
            </CloseButton>
          </Header>

          <Section>
            <div>
              <SectionTitle>Players</SectionTitle>
              <Section>
                <PlayerRow>
                  <PlayerBadge variant="X">X</PlayerBadge>
                  <Input
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    placeholder="Player 1"
                  />
                </PlayerRow>
                <PlayerRow>
                  <PlayerBadge variant="O">O</PlayerBadge>
                  <Input
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    placeholder="Player 2"
                  />
                </PlayerRow>
              </Section>
            </div>

            <ToggleRow>
              <ToggleInfo>
                {soundEnabled ? (
                  <Volume2 size={20} color="#c084fc" />
                ) : (
                  <VolumeX size={20} color="#71717a" />
                )}
                <span>Sound Effects</span>
              </ToggleInfo>

              <ToggleButton enabled={soundEnabled} onClick={handleToggleSound}>
                <ToggleKnob enabled={soundEnabled} />
              </ToggleButton>
            </ToggleRow>
          </Section>

          <SaveButton onClick={handleSave}>
            Save & Restart Game
          </SaveButton>
        </Card>
      </Wrapper>
    </>
  );
}
