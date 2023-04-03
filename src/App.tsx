import "./styles.css";
import { Board } from "./Board";
import { useState, useEffect } from "react";
import GameHistory from "./GameHistory";

export default function App() {
  // writing succinct code means less bytes in the javascript
  // commenting out boardState and adding history to be able to jump to any previous state.
  // const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [nextPlayer, setNextPlayer] = useState("X");

  // const boardState = history[history.length - 1];
  const handlePlay = (nextState: Array<string>) => {
    setHistory([...history, nextState]);
  };

  useEffect(() => {
    if (history.length % 2 !== 0) {
      setNextPlayer("X");
    } else {
      setNextPlayer("0");
    }
  }, [history]);

  const jumpTo = (idx: number) => {
    const updatedHistory = history.slice(0, idx + 1);
    setHistory(updatedHistory);
  };

  return (
    <div className="App">
      <Board
        boardState={history[history.length - 1]}
        onPlay={handlePlay}
        nextPlayer={nextPlayer}
      />
      <GameHistory history={history} jumpTo={jumpTo} />
    </div>
  );
}
