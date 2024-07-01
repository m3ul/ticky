import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  );
  const [isXNext, setIsXNext] = useState(true);
  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map((r, i) =>
      r.map((c, j) => {
        if (i === row && j === col) {
          return isXNext ? "X" : "O";
        }
        return c;
      }),
    );

    const newMove = { row, col, symbol: isXNext ? "X" : "O" };
    const newMoves = [...moves, newMove];

    if (newMoves.filter((move) => move.symbol === "X").length > 3) {
      const firstXMove = newMoves.findIndex((move) => move.symbol === "X");
      const { row, col } = newMoves[firstXMove];
      newBoard[row][col] = null;
      newMoves.splice(firstXMove, 1);
    }

    if (newMoves.filter((move) => move.symbol === "O").length > 3) {
      const firstOMove = newMoves.findIndex((move) => move.symbol === "O");
      const { row, col } = newMoves[firstOMove];
      newBoard[row][col] = null;
      newMoves.splice(firstOMove, 1);
    }

    setBoard(newBoard);
    setMoves(newMoves);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [
      // Horizontal lines
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Vertical lines
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonal lines
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;

      if (
        board[rowA][colA] &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] === board[rowC][colC]
      ) {
        setWinner(board[rowA][colA]);
        return;
      }
    }
  };

  const renderCell = (row, col) => {
    const xMoves = moves.filter((move) => move.symbol === "X");
    const oMoves = moves.filter((move) => move.symbol === "O");

    let className = "cell";
    if (xMoves.length === 3) {
      const thirdOldestX = xMoves[0];
      if (thirdOldestX.row === row && thirdOldestX.col === col) {
        className += " highlight";
      }
    }
    if (oMoves.length === 3) {
      const thirdOldestO = oMoves[0];
      if (thirdOldestO.row === row && thirdOldestO.col === col) {
        className += " highlight";
      }
    }

    return (
      <button className={className} onClick={() => handleClick(row, col)}>
        {board[row][col]}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="cell-wrapper">
              {renderCell(rowIndex, colIndex)}
            </div>
          )),
        )}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      <button className="reset" onClick={() => window.location.reload()}>
        Reset
      </button>
    </div>
  );
};

export default App;
