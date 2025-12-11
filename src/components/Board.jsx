import styled from 'styled-components'
import { Cell } from '../components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 110px);
  grid-template-rows: repeat(3, 110px);
  gap: 18px;
  background: transparent;
  padding: 32px;
`

export default function Board ({
  board = Array(9).fill(null),
  onClickCell = () => {}
}) {
  return (
    <Grid>
      {board.map((val, idx) => (
        <Cell key={idx} value={val} onClick={() => onClickCell(idx)} />
      ))}
    </Grid>
  )
}
