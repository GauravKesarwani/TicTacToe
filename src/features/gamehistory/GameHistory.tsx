import React from "react";

interface GameHistoryProps {
  history: Array<Array<Array<string | null>>>;
  jumpTo: (i: number) => void;
  removeWinningSquares: () => void;
}

const GameHistory = ({ history, jumpTo, removeWinningSquares }: GameHistoryProps) => {

  const handleJumpTo = (i: number) => {
    removeWinningSquares();
    jumpTo(i);
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
