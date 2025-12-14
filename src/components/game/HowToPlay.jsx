import styled from 'styled-components'
import { ArrowLeft } from 'lucide-react'

/* Overlay */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 40;
  transition: opacity 0.2s ease;
`

/* Modal wrapper */
const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

/* Modal card */
const ModalCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
  background: #18181b; /* zinc-900 */
  border: 1px solid #27272a; /* zinc-800 */
  border-radius: 1rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

/* Back button */
const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #27272a; /* zinc-800 */
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #3f3f46; /* zinc-700 */
  }
`

/* Content */
const Content = styled.div`
  margin-top: 2rem;
  text-align: center;
`

/* Text */
const Paragraph = styled.p`
  color: white;
  font-size: 1.125rem;
  line-height: 1.75;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  & + & {
    margin-top: 1rem;
  }
`

const Emphasis = styled.span`
  font-weight: 500;
`

const PurpleX = styled.span`
  color: #c084fc; /* purple-400 */
  font-weight: 600;
`

const PurpleO = styled.span`
  color: #d8b4fe; /* purple-300 */
  font-weight: 600;
`

const GoalText = styled(Paragraph)`
  margin-top: 1.5rem;
  font-weight: 400;
`

export default function HowToPlayModal () {
  return (
    <>
      <Overlay />

      <ModalWrapper>
        <ModalCard>
          <BackButton>
            <ArrowLeft size={16} color='white' />
          </BackButton>

          <Content>
            <Paragraph>
              <Emphasis>Tic-Tac-Toe</Emphasis> is a quick two-player game played
              on a 3×3 grid. One player is <PurpleX>X</PurpleX>, and the other
              is <PurpleO>O</PurpleO>.
            </Paragraph>

            <Paragraph>
              Players take turns placing their mark in an empty square.
            </Paragraph>

            <GoalText>
              <Emphasis>The goal is simple:</Emphasis>
            </GoalText>

            <Paragraph>
              Be the first to get three of your marks in a row — horizontally,
              vertically, or diagonally.
            </Paragraph>

            <Paragraph>
              If all nine squares are filled and no one has three in a row, the
              game ends in a draw.
            </Paragraph>
          </Content>
        </ModalCard>
      </ModalWrapper>
    </>
  )
}
