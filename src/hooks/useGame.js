import { GameProvider } from './GameContext'
import { useContext } from 'react'

export default function useGame () {
  const context = useContext(GameProvider)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
