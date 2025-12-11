import { createContext, useContext, useState } from "react";
import useGameLogic from "../hooks/useGameLogic";

const GameContext = createContext();

export function GameProvider({ children }) {
  const { checkWinner } = useGameLogic();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  function makeMove(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (result) {
      setWinner(result);
      setScores(prev => ({ ...prev, [result]: prev[result] + 1 }));
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner("draw");
      return;
    }

    setCurrentPlayer(prev => (prev === "X" ? "O" : "X"));
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("X");
  }

  return (
    <GameContext.Provider value={{ board, currentPlayer, winner, scores, makeMove, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
