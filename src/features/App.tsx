import "../styles.css";
import { Board } from "./game/Board";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addMarkToBoard, update } from './game/gameSlice';
import GameSettings from "./game/GameSettings";
import GameHistory from "./gamehistory/GameHistory";
import GameControls from "./gameControls/GameControls";
import { findBestMove } from "../utils/utils";

export default function App() {
  const [gameStarted, setGameStarted ] = useState(false);
  
  const dispatch = useAppDispatch();
  // writing succinct code means less bytes in the javascript
  // commenting out boardState and adding history to be able to jump to any previous state.
  
  // const [boardState, setBoardState] = useState(Array(9).fill(null));
  // const [history, setHistory] = useState([Array(9).fill(null)]);
  // const [nextPlayer, setNextPlayer] = useState("X");

  // @ts-ignore
  const history = useAppSelector(state => state.history.gamehistory);
  const playerMark = useAppSelector(state => state.history.playerMark)
  const cpuMark = useAppSelector(state => state.history.cpuMark)
  // const state = useAppSelector(state => state);
  console.log('history', history);
  const boardState = history[history.length - 1];
  // @ts-ignore
  const nextPlayer = useAppSelector(state => state.history.nextPlayer);
  const prevPlayer = useAppSelector(state => state.history.prevPlayer);
  const opponent = useAppSelector(state => state.history.opponent);

  // const boardState = history[history.length - 1];
  const handlePlay = (i: number, j: number, mark: string) => {

    // dispatch redux action here instead of setting in component state.
    dispatch(addMarkToBoard({ i, j, mark }));
    // dispatch(setNextPlayer("cpu"));

    
    // setHistory([...history, nextState]);
  };

  const removeWinningSquares = () => {
    const squares = Array.from(document.querySelectorAll(".cell"));
    squares.forEach((el, i) => {
      el.classList.remove('winner');
    });
  };


  const startGame = () => {
    setGameStarted(true)
  }

  const jumpTo = (idx: number) => {
    // const prevState = history.slice(0, idx + 1);
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
