import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './gamehistory.scss';

interface GameHistoryProps {
  history: Array<Array<Array<string | null>>>;
  jumpTo: (i: number) => void;
  removeWinningSquares: () => void;
}

const GameHistory = ({
  history,
  jumpTo,
  removeWinningSquares,
}: GameHistoryProps) => {
  const gameHistoryMode = useAppSelector(
    (state) => state.board.gameHistoryMode
  );
  const handleJumpTo = (i: number) => {
    removeWinningSquares();
    jumpTo(i);
  };

  return gameHistoryMode ? (
    <ul className="gamehistory-container">
      {history.map((h, idx) => {
        let description = '';
        if (idx === 0) {
          description = `Go to game start`;
        } else {
          description = `Go to step ${idx}`;
        }
        return (
          <li>
            <button className="btn-step" onClick={() => handleJumpTo(idx)}>
              {description}
            </button>
          </li>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};

export default GameHistory;
