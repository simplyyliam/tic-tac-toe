import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainMenu, GamePage } from "./views";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/play" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
