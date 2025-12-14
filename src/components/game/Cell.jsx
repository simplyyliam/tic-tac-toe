import styled from 'styled-components'

const Square = styled.button`
  width: 110px;
  height: 110px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 46px;
  cursor: pointer;
  color: ${p => (p.value === 'X' ? '#8a3ff1' : '#d6c9ff')};
`

export default function Cell ({ value, onClick }) {
  return (
    <Square
      value={value}
      onClick={onClick}
      aria-label={`cell ${value ?? 'empty'}`}
    >
      {value}
    </Square>
  )
}
