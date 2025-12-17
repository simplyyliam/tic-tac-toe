import styled, { keyframes } from 'styled-components'

const shapes = [
  { type: 'x', x: '10%', y: '15%', size: 40, rotation: 15 },
  { type: 'o', x: '85%', y: '20%', size: 50, rotation: 0 },
  { type: 'line', x: '20%', y: '80%', size: 60, rotation: 45 },
  { type: 'o', x: '75%', y: '75%', size: 35, rotation: 0 },
  { type: 'x', x: '90%', y: '50%', size: 30, rotation: -20 },
  { type: 'line', x: '5%', y: '50%', size: 50, rotation: -30 },
  { type: 'o', x: '30%', y: '25%', size: 45, rotation: 0 },
  { type: 'x', x: '60%', y: '85%', size: 35, rotation: 30 },
  { type: 'line', x: '50%', y: '10%', size: 40, rotation: 90 },
  { type: 'o', x: '15%', y: '65%', size: 40, rotation: 0 },
  { type: 'x', x: '45%', y: '70%', size: 25, rotation: -15 },
  { type: 'line', x: '70%', y: '40%', size: 55, rotation: 60 },
  { type: 'o', x: '40%', y: '45%', size: 30, rotation: 0 },
  { type: 'x', x: '25%', y: '90%', size: 45, rotation: 45 },
  { type: 'line', x: '80%', y: '90%', size: 45, rotation: -45 },
  { type: 'o', x: '55%', y: '30%', size: 55, rotation: 0 },
  { type: 'x', x: '95%', y: '85%', size: 35, rotation: 20 },
  { type: 'line', x: '35%', y: '5%', size: 35, rotation: 120 }
]

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

const Shape = styled.div`
  position: absolute;
  color: rgba(39, 39, 42, 0.6);
  animation: ${float} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  left: ${props => props.$x};
  top: ${props => props.$y};
`

function XShape ({ size, rotation }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 100 100'
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d='M20 20 L80 80'
        stroke='currentColor'
        strokeWidth='10'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M80 20 L20 80'
        stroke='currentColor'
        strokeWidth='10'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  )
}

function OShape ({ size }) {
  return (
    <svg width={size} height={size} viewBox='0 0 100 100'>
      <circle
        cx='50'
        cy='50'
        r='35'
        stroke='currentColor'
        strokeWidth='10'
        fill='none'
      />
    </svg>
  )
}

function LineShape ({ size, rotation }) {
  return (
    <svg
      width={size}
      height={size * 0.3}
      viewBox='0 0 100 30'
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <line
        x1='0'
        y1='15'
        x2='100'
        y2='15'
        stroke='currentColor'
        strokeWidth='10'
        strokeLinecap='round'
      />
    </svg>
  )
}

const shapesWithRandom = shapes.map(shape => ({
  ...shape,
  duration: 3 + Math.random() * 2 
}))

export default function AnimatedBackground () {
  return (
    <Container>
      {shapesWithRandom.map((shape, index) => (
        <Shape
          key={index}
          $x={shape.x}
          $y={shape.y}
          $delay={index * 0.1}
          $duration={shape.duration} 
        >
          {shape.type === 'x' && (
            <XShape size={shape.size} rotation={shape.rotation} />
          )}
          {shape.type === 'o' && <OShape size={shape.size} />}
          {shape.type === 'line' && (
            <LineShape size={shape.size} rotation={shape.rotation} />
          )}
        </Shape>
      ))}
    </Container>
  )
}
