import React from "react";
import "../game/gamehistory.scss";

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
    <ol className="gamehistory-container">
      {history.map((h, idx) => {
        let description = "";
        if (idx === 0) {
          description = `Go to game start`;
        } else {
          description = `Go to step ${idx}`;
        }
        return (
          <li>
            <button className="btn-step" onClick={() => handleJumpTo(idx)}>{description}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default GameHistory;
