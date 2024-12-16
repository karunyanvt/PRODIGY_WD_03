import React, { useState } from "react";
import GameBoard from "./Components/GameBoard";

const App = () => {
  const [mode, setMode] = useState("PvP");

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-black p-4">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white">Tic Tac Toe</h1>
      </header>

      {/* Game Mode Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("PvP")}
          className={`py-2 px-4 rounded text-sm font-medium ${
            mode === "PvP" ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
          }`}
        >
          Player vs Player
        </button>
        <button
          onClick={() => setMode("PvC")}
          className={`py-2 px-4 rounded text-sm font-medium ${
            mode === "PvC" ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
          }`}
        >
          Player vs Computer
        </button>
      </div>

      {/* Game Board */}
      <div className="w-full max-w-xs">
        <GameBoard mode={mode} />
      </div>
    </div>
  );
};

export default App;
