import styled from "styled-components"

const IconRow = styled.div`
  display: inline-flex;
  gap: 8px;
  margin-bottom: 1.25rem;
`

const MiniSquare = styled.div`
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.4);
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`

const Title = styled.h1`
  font-size: clamp(48px, 9vw, 96px);
  margin: 0 0 2rem 0;
  font-weight: 700;
  letter-spacing: -1px;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1.5rem;
`

const Button = styled.button`
  min-width: 240px;
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  background: ${props => (props.primary ? 'rgba(255,255,255,0.12)' : '#fff')};
  color: ${props => (props.primary ? '#fff' : '#111')};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
`

export default function LandingPage ({
  onPlay = () => {},
  onPlaybook = () => {}
}) {
  return (
    <Wrapper>
      <Center>
        <IconRow>
          <MiniSquare>O</MiniSquare>
          <MiniSquare>X</MiniSquare>
          <MiniSquare>O</MiniSquare>
        </IconRow>
        <Title>Tic Tac Toe</Title>
        <Buttons>
          <Button primary onClick={onPlay}>
            Play
          </Button>
          <Button onClick={onPlaybook}>Playbook</Button>
        </Buttons>
      </Center>
    </Wrapper>
  )
}
