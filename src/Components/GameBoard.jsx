import React, { useState, useEffect } from "react";
import Square from "./Square";

const GameBoard = ({ mode }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const checkWinner = calculateWinner(updatedBoard);
    if (checkWinner) {
      setWinner(checkWinner);
      updateScore(checkWinner);
    } else if (updatedBoard.every((cell) => cell)) {
      setWinner("Draw");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const updateScore = (winner) => {
    if (winner !== "Draw") {
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  useEffect(() => {
    if (mode === "PvC" && currentPlayer === "O" && !winner) {
      const emptySquares = board
        .map((val, index) => (val === null ? index : null))
        .filter((val) => val !== null);

      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const computerMove = emptySquares[randomIndex];

      setTimeout(() => handleClick(computerMove), 500); // Add delay for realism
    }
  }, [currentPlayer, board, mode, winner]);

  return (
    <div className="flex flex-col items-center justify-between h-[70vh]">
      {/* Board */}
      <div className="grid grid-cols-3 gap-1 w-full max-w-xs">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            size="small"
          />
        ))}
      </div>

      {/* Winner Message */}
      {winner && (
        <p
          className={`text-lg font-bold mt-2 ${
            winner === "Draw"
              ? "text-gray-400"
              : winner === "X"
              ? "text-white"
              : "text-gray-500"
          }`}
        >
          {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
        </p>
      )}

      {/* Restart Button */}
      <button
        onClick={resetGame}
        className="mt-4 py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
      >
        Restart Game
      </button>

      {/* Score */}
      <div className="flex justify-between w-full text-gray-400 mt-2">
        <p>Player X: {score.X}</p>
        <p>Player O: {score.O}</p>
      </div>
    </div>
  );
};

export default GameBoard;
