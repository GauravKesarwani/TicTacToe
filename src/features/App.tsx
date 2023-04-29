
import { Board } from "./game/Board";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addMarkToBoard, update } from './game/gameSlice';
import GameSettings from "./game/GameSettings";
import GameHistory from "./gamehistory/GameHistory";
import GameControls from "./gameControls/GameControls";

import "../app.scss";

export default function App() {
  const [gameStarted, setGameStarted ] = useState(false);
  
  const dispatch = useAppDispatch();
  // writing succinct code means less bytes in the javascript
  // @ts-ignore
  const history = useAppSelector(state => state.history.gamehistory);
  const playerMark = useAppSelector(state => state.history.playerMark)
  const cpuMark = useAppSelector(state => state.history.cpuMark)
  const boardState = useAppSelector(state => state.history.boardState)
  // @ts-ignore
  const nextPlayer = useAppSelector(state => state.history.nextPlayer);
  const prevPlayer = useAppSelector(state => state.history.prevPlayer);
  const opponent = useAppSelector(state => state.history.opponent);

  const handlePlay = async (i: number, j: number, mark: string) => {
    // dispatch redux action here instead of setting in component state.
    return dispatch(addMarkToBoard({ i, j, mark }));
  };


  // you are not doing this the react way.
  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll(".cell"));
    squares.forEach((el, i) => {
      el.classList.remove('winner');
    });
  };


  const startGame = () => {
    setGameStarted(true);

    /* If next player is cpu on game start, then play the first turn */
    if (nextPlayer === "cpu") {
      // @ts-ignore
      dispatch(addMarkToBoard({i: -1, j: -1, cpuMark }));
    }
  }

  const jumpTo = (idx: number) => {
    dispatch(update(idx))
  };


  // Somehow the board is being rendered twice.
  return (
    <div className="App">
      {!gameStarted && <GameSettings startGame={startGame} />}
      {gameStarted && 
      <>
        <GameControls removeWinningSquares={removeWinningSquares} />
        <Board
          boardState={boardState}
          onPlay={handlePlay}
          prevPlayer={prevPlayer}
          nextPlayer={nextPlayer}
          opponent={opponent}
          playerMark={playerMark}
          cpuMark={cpuMark}
          gameStarted={gameStarted}
        />
        <GameHistory history={history} jumpTo={jumpTo} removeWinningSquares={removeWinningSquares} />
      </>}
    </div>
  );
}
