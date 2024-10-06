import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  const squareClass = value === 'X' ? 'square x' : value === 'O' ? 'square o' : 'square';
  
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");

  const winner = calculateWinner(squares);
  const isTie = squares.every(square => square !== null);

  const handleClick = (index) => {
    if (winner || squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const nextStatus = calculateWinner(newSquares)
      ? `Winner: ${isXNext ? 'X' : 'O'}`
      : isTie
        ? "Tie"
        : `Next player: ${isXNext ? 'O' : 'X'}`;

    setStatus(nextStatus);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setStatus("Next player: X");
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
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
    [2, 4, 6]
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  return (
    <div className="game">
      <h1>Welcome to Tic Tac Toe Game</h1> {" ___@itY_Ltd___ "}
      <Board />
    </div>
  );
};


export default Game;
