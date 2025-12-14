import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HowToPlayModal, Logo } from '../components'
import { useModal } from '../hooks'

/* Layout */
const Page = styled.div`
  min-height: 100vh;
  background: #09090b; /* zinc-950 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1rem;
`

/* Title */
const Title = styled.h1`
  font-family: Inter, system-ui, sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`

/* Buttons */
const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 16rem;
  margin: 0 auto;
`

const BaseButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }
`

const PlayButton = styled(BaseButton)`
  background: #27272a; /* zinc-800 */
  color: white;

  &:hover {
    background: #3f3f46; /* zinc-700 */
  }
`

const PlaybookButton = styled(BaseButton)`
  background: white;
  color: #18181b; /* zinc-900 */

  &:hover {
    background: #f4f4f5; /* zinc-100 */
  }
`

export default function Home () {
  const howToPlayModal = useModal()
  return (
    <Page>
      <Content>
        <Logo />

        <Title>Tic Tac Toe</Title>
        <ButtonStack>
          <Link to='Game'>
            <PlayButton>Play</PlayButton>
          </Link>
          <PlaybookButton onClick={howToPlayModal.open}>
            Playbook
          </PlaybookButton>
        </ButtonStack>
      </Content>
      <HowToPlayModal
        isOpen={howToPlayModal.isOpen}
        onClose={howToPlayModal.close}
        soundEnabled={true}
      />
    </Page>
  )
}
