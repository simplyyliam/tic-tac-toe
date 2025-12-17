import styled from 'styled-components'
import { ArrowLeft } from 'lucide-react'
import { useSound } from '../../hooks'

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
  max-width: 32rem;
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #27272a;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3f3f46;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const TextContent = styled.div`
  margin-top: 2rem;
  text-align: center;
`

const Paragraph = styled.p`
  color: white;
  font-size: 1.125rem;
  line-height: 1.75;
  font-weight: ${props => (props.$light ? '300' : '400')};
  margin-top: ${props => props.$marginTop || '0'};

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const Medium = styled.span`
  font-weight: 500;
`

const PurpleText = styled.span`
  color: #a855f7;
  font-weight: 600;
`

const LightPurpleText = styled.span`
  color: #d8b4fe;
  font-weight: 600;
`

export default function HowToPlayModal ({
  isOpen,
  onClose,
  soundEnabled = true
}) {
  const { playClick } = useSound(soundEnabled)

  const handleClose = () => {
    playClick()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <Overlay onClick={handleClose} />
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={handleClose}>
            <ArrowLeft />
          </CloseButton>

          <TextContent>
            <Paragraph $light>
              <Medium>Tic-Tac-Toe</Medium> is a quick two-player game played on
              a 3×3 grid. One player is <PurpleText>X</PurpleText>, and the
              other is <LightPurpleText>O</LightPurpleText>.
            </Paragraph>

            <Paragraph $light $marginTop='1rem'>
              Players take turns placing their mark in an empty square.
            </Paragraph>

            <Paragraph $marginTop='1.5rem'>
              <Medium>The goal is simple:</Medium>
            </Paragraph>

            <Paragraph $light>
              Be the first to get three of your marks in a row — horizontally,
              vertically, or diagonally.
            </Paragraph>

            <Paragraph $light $marginTop='1rem'>
              If all nine squares are filled and no one has three in a row, the
              game ends in a draw.
            </Paragraph>
          </TextContent>
        </ModalContent>
      </ModalContainer>
    </>
  )
}
