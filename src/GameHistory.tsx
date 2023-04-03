import React from "react";

const GameHistory = ({ history, jumpTo }) => {
  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll(".cell"));
    squares.forEach(() => {});
  };

  const handleJumpTo = () => {
    removeWinningSquares();
    jumpTo();
  };

  return (
    <ol className="gameHistory-container">
      {history.map((h, idx) => {
        let description = "";
        if (idx === 0) {
          description = `Go to game start`;
        } else {
          description = `Go to step ${idx}`;
        }
        return (
          <li>
            <button onClick={() => handleJumpTo(idx)}>{description}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default GameHistory;
