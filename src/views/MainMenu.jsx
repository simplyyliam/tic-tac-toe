import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HowToPlayModal, Logo } from '../components'
import { useModal } from '../hooks'

const Container = styled.div`
  min-height: 100vh;
  background-color: #09090b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  text-center;
  padding: 0 1rem;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 3rem;
  font-family: 'Inter', system-ui, sans-serif;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 16rem;
  margin: 0 auto;
`

const PlayButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #27272a;
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3f3f46;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }
`

const PlaybookButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background-color: white;
  color: #18181b;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f5;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }
`

export default function Home () {
  const howToPlayModal = useModal()
  return (
    <Container>
      <Content>
        <Logo />

        <Title>Tic Tac Toe</Title>

        <ButtonContainer>
          <Link to='play'>
            <PlayButton>Play</PlayButton>
          </Link>

          <PlaybookButton onClick={howToPlayModal.open}>
            Playbook
          </PlaybookButton>
        </ButtonContainer>
      </Content>

      <HowToPlayModal
        isOpen={howToPlayModal.isOpen}
        onClose={howToPlayModal.close}
        soundEnabled={true}
      />
    </Container>
  )
}
