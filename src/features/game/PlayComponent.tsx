import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Board } from '../game/Board';
import GameControls from '../game/GameControls';
import GameHistory from '../game/GameHistory';
import { update, addMarkToBoard } from '../game/gameSlice';

const PlayComponent = () => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const history = useAppSelector((state) => state.history.gamehistory);
  const playerMark = useAppSelector((state) => state.history.playerMark);
  const cpuMark = useAppSelector((state) => state.history.cpuMark);
  const boardState = useAppSelector((state) => state.history.boardState);
  // @ts-ignore
  const nextPlayer = useAppSelector((state) => state.history.nextPlayer);
  const prevPlayer = useAppSelector((state) => state.history.prevPlayer);
  const opponent = useAppSelector((state) => state.history.opponent);
  const gameHistoryMode = useAppSelector(
    (state) => state.history.gameHistoryMode
  );

  // you are not doing this the react way.
  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll('.cell'));
    squares.forEach((el, i) => {
      el.classList.remove('winner');
    });
  };

  const handlePlay = async (i: number, j: number, mark: string) => {
    // dispatch redux action here instead of setting in component state.
    return dispatch(addMarkToBoard({ i, j, mark }));
  };

  const jumpTo = (idx: number) => {
    dispatch(update(idx));
  };

  return (
    <>
      <GameControls />
      <Board
        boardState={boardState}
        onPlay={handlePlay}
        prevPlayer={prevPlayer}
        nextPlayer={nextPlayer}
        opponent={opponent}
        playerMark={playerMark}
        cpuMark={cpuMark}
      />
      {gameHistoryMode && (
        <GameHistory
          history={history}
          jumpTo={jumpTo}
          removeWinningSquares={removeWinningSquares}
        />
      )}
    </>
  );
};

export default PlayComponent;
