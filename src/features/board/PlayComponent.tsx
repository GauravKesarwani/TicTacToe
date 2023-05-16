import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Board } from './Board';
import GameControls from './GameControls';
import GameHistory from '../history/GameHistory';
import { playTurn } from './boardSlice';
import { update } from '../history/historySlice';

const PlayComponent = () => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const history = useAppSelector((state) => state.board.gamehistory);
  const playerMark = useAppSelector((state) => state.game.playerMark);
  const cpuMark = useAppSelector((state) => state.game.cpuMark);
  const boardState = useAppSelector((state) => state.board.boardState);
  // @ts-ignore
  const currentPlayer = useAppSelector((state) => state.board.currentPlayer);
  const prevPlayer = useAppSelector((state) => state.board.prevPlayer);
  const opponent = useAppSelector((state) => state.board.opponent);

  // you are not doing this the react way.
  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll('.cell'));
    squares.forEach((el, i) => {
      el.classList.remove('winner');
    });
  };

  const handlePlay = (i: number, j: number, mark: string) => {
    // dispatch redux action here instead of setting in component state.
    dispatch(playTurn({ i, j, mark }));
  };

  const jumpTo = (idx: number) => {
    dispatch(update({ idx, board: history[idx] }));
  };

  return (
    <>
      <GameControls />
      <Board
        boardState={boardState}
        onPlay={handlePlay}
        prevPlayer={prevPlayer}
        currentPlayer={currentPlayer}
        opponent={opponent}
        playerMark={playerMark}
        cpuMark={cpuMark}
      />
      <GameHistory
        history={history}
        jumpTo={jumpTo}
        removeWinningSquares={removeWinningSquares}
      />
    </>
  );
};

export default PlayComponent;
