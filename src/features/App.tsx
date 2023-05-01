import { Board } from './game/Board';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  addMarkToBoard,
  update,
  setGameStatus,
  toggleRestartPrompt,
} from './game/gameSlice';
import GameHome from './game/GameHome';
import GameHistory from './game/GameHistory';
import GameControls from './game/GameControls';
import GameSettingsModal from './game/GameSettings';
import RestartModal from './game/RestartModal';

import '../app.scss';

export default function App() {
  const dispatch = useAppDispatch();
  // writing succinct code means less bytes in the javascript
  // @ts-ignore
  const history = useAppSelector((state) => state.history.gamehistory);
  const playerMark = useAppSelector((state) => state.history.playerMark);
  const cpuMark = useAppSelector((state) => state.history.cpuMark);
  const boardState = useAppSelector((state) => state.history.boardState);
  // @ts-ignore
  const nextPlayer = useAppSelector((state) => state.history.nextPlayer);
  const prevPlayer = useAppSelector((state) => state.history.prevPlayer);
  const opponent = useAppSelector((state) => state.history.opponent);
  const gameStatus = useAppSelector((state) => state.history.gameStatus);
  const gameSettings = useAppSelector((state) => state.history.gameSettings);
  const restartPrompt = useAppSelector((state) => state.history.restartPrompt);
  const gameHistoryMode = useAppSelector(
    (state) => state.history.gameHistoryMode
  );
  const handlePlay = async (i: number, j: number, mark: string) => {
    // dispatch redux action here instead of setting in component state.
    return dispatch(addMarkToBoard({ i, j, mark }));
  };

  // you are not doing this the react way.
  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll('.cell'));
    squares.forEach((el, i) => {
      el.classList.remove('winner');
    });
  };

  const startGame = () => {
    dispatch(setGameStatus('inprogress'));

    /* If next player is cpu on game start, then play the first turn */
    if (nextPlayer === 'cpu') {
      // @ts-ignore
      dispatch(addMarkToBoard({ i: -1, j: -1, cpuMark }));
    }
  };

  const jumpTo = (idx: number) => {
    dispatch(update(idx));
  };

  // Somehow the board is being rendered twice.
  return (
    <div className="App">
      {gameStatus === 'notStarted' && <GameHome startGame={startGame} />}
      {gameStatus === 'inprogress' && (
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
      )}
      {restartPrompt && <RestartModal />}
      {gameSettings && <GameSettingsModal />}
    </div>
  );
}
