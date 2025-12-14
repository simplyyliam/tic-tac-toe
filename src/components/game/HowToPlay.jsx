
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
`

const Card = styled.div`
  width: min(780px, 92%);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 22px;
  padding: 36px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
  color: #fff;
  line-height: 1.6;
`

const Close = styled.button`
  position: absolute;
  left: 24px;
  top: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
`

export default function HowToPlayModal ({ open, onClose }) {
  if (!open) return null
  return (
    <Overlay>
      <Card>
        <Close onClick={onClose} aria-label='Close'>
          ←
        </Close>
        <div style={{ paddingTop: 8, textAlign: 'center', fontSize: 20 }}>
          <p style={{ fontSize: 20 }}>
            Tic-Tac-Toe is a quick two-player game played on a 3×3 grid. One
            player is X, and the other is O. Players take turns placing their
            mark in an empty square.
          </p>
          <p style={{ marginTop: 12 }}>
            The goal is simple: Be the first to get three of your marks in a row
            — horizontally, vertically, or diagonally. If all nine squares are
            filled and no one has three in a row, the game ends in a draw.
          </p>
        </div>
      </Card>
    </Overlay>
  )
}
