
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 12px 16px;
  border-radius: 28px;
  min-width: 170px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.6);
`

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.6) inset;
`

const Info = styled.div`
  color: #fff;
  font-size: 14px;
`

const Name = styled.div`
  font-weight: 700;
  letter-spacing: -0.2px;
`

const Record = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
`

export default function PlayerCard ({
  name = 'Player',
  avatar,
  wins = 0,
  losses = 0
}) {
  return (
    <Card>
      <Avatar src={avatar} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Record>
          w: {wins} L: {losses}
        </Record>
      </Info>
    </Card>
  )
}
