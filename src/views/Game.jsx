import { useState } from "react";
import styled from "styled-components";
import { HowToPlayModal, Board, PlayerCard } from "../components";
import { useGame } from "../context/useGame"

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 2.5rem;
  color: #fff;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 520px 1fr;
  gap: 24px;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

const TopControls = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const Timer = styled.div`
  background: rgba(255, 255, 255, 0.04);
  padding: 10px 18px;
  border-radius: 8px;
`;

export default function GamePage() {
  const { board, makeMove, winner, resetGame, currentPlayer } = useGame();
  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <Page>
      <Layout>
        <PlayerCard name="Liam" avatar="/avatar-left.jpg" wins={2} losses={1} />

        <div style={{ textAlign: "center" }}>
          <TopControls>
            <Timer>⏱ 05:15</Timer>
            <button
              onClick={() => setShowHowTo(true)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "none",
                padding: "10px 12px",
                borderRadius: 8
              }}
            >
              ||
            </button>
          </TopControls>

          <Board board={board} onClickCell={makeMove} />

          {winner && (
            <div style={{ marginTop: 20, fontSize: 24 }}>
              {winner === "draw" ? "It's a draw!" : `${winner} wins!`}
              <button
                onClick={resetGame}
                style={{
                  marginLeft: 12,
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Play Again
              </button>
            </div>
          )}

          {!winner && (
            <div style={{ marginTop: 20, opacity: 0.8 }}>
              Current Turn: <strong>{currentPlayer}</strong>
            </div>
          )}
        </div>

        <PlayerCard
          name="Zack"
          avatar="/avatar-right.jpg"
          wins={1}
          losses={2}
        />
      </Layout>

      <HowToPlayModal open={showHowTo} onClose={() => setShowHowTo(false)} />
    </Page>
  );
}
