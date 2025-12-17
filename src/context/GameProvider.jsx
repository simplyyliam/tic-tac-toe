import { useState, useCallback, useEffect } from 'react'
import GameContext from './GameContext'
import { faker } from '@faker-js/faker'


const WINING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export default function GameProvider ({ children }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(false)
  const [winningLine, setWinningLine] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const [theme, setTheme] = useState('dark')
  const [soundEnabled, setSoundEnabled] = useState(true)

  const [players, setPlayers] = useState({
    X: {
      name: faker.person.firstName(),
      avatar:
        faker.image.avatar(),
      wins: 0,
      losses: 0
    },
    O: {
      name: faker.person.firstName(),
      avatar:
        faker.image.avatar(),
      wins: 0,
      losses: 0
    }
  })

  useEffect(() => {
    let interval
    if (gameStarted && !isPaused && !winner && !isDraw) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [gameStarted, isDraw, isPaused, winner])

  const handleCheckWinner = useCallback(squares => {
    for (let combo of WINING_COMBOS) {
      const [a, b, c] = combo
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: combo }
      }
    }
    return null
  }, [])

  const handleMakeMove = useCallback(
    i => {
      if (board[i] || winner || isDraw || isPaused) return false
      const newBoard = [...board]
      newBoard[i] = currentPlayer
      setBoard(newBoard)

      const result = handleCheckWinner(newBoard)
      if (result) {
        setWinner(result.winner)
        setWinningLine(result.line)
        setPlayers(prev => ({
          ...prev,
          [result.winner]: {
            ...prev[result.winner],
            wins: prev[result.winner].wins + 1
          },
          ...prev[result.winner === 'X' ? 'O' : 'X'],
          losses: prev[result.winner === 'X' ? 'O' : 'X'].losses + 1
        }))
        return 'win'
      } else if (newBoard.every(cell => cell !== null)) {
        setIsDraw(true)
        return 'draw'
      }

      setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'))
      return 'move'
    },
    [board, currentPlayer, winner, isDraw, isPaused, handleCheckWinner]
  )

  const handleGameReset = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
    setWinningLine([])
    setTimer(0)
    setIsPaused(false)
  }, [])

  const handleGameStart = useCallback(() => {
    handleGameReset()
    setGameStarted(true)
  }, [handleGameReset])

  const handleGamePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const handleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const handleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

  const handleUpdateName = useCallback((player, name) => {
    setPlayers(prev => ({
      ...prev,
      [player]: { ...prev[player], name }
    }))
  }, [])

  const value = {
    board,
    currentPlayer,
    winner,
    isDraw,
    winningLine,
    gameStarted,
    isPaused,
    timer,
    theme,
    soundEnabled,
    players,
    handleMakeMove,
    handleGameReset,
    handleGameStart,
    handleGamePause,
    handleTheme,
    handleSound,
    handleUpdateName
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
