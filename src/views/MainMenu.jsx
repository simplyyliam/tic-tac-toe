import styled from 'styled-components'
import { Logo } from '../components'

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
export default function Home () {
  return (
    <Page>
      <Content>
        <Logo />

        <Title>Tic Tac Toe</Title>
      </Content>
    </Page>
  )
}
