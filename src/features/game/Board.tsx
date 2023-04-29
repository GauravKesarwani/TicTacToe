import { Cell } from "./Cell";
import "./board.scss";
import { useAppSelector } from "../../app/hooks";
import { marks } from '../../utils/constants';

interface BoardProps {
  boardState: Array<Array<string | null>>;
  prevPlayer: string;
  nextPlayer: string;
  opponent: string;
  playerMark: string;
  cpuMark: string;
  gameStarted: boolean;
  onPlay: (i: number, j: number, mark: string) => void;
}

export const Board = ({ boardState, nextPlayer, playerMark, onPlay }: BoardProps) => {
  const winner = useAppSelector(state => state.history.winner);
  const cells = [];

  // For the UI state, where should this computation go ?
  let nextPlayerMark = nextPlayer === "player" && playerMark === marks.X ? marks.X : marks.O;

  const handleCellClick = async (r: number, c: number) => {
    if (winner || boardState[r][c]) {
      return;
    }
   onPlay(r, c, playerMark);
  };


  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      cells.push(
        <Cell
          key={`${r}${c}`}
          row={r}
          col={c}
          nextTurn={nextPlayer}
          nextPlayerMark={nextPlayerMark}
          handleCellClick={handleCellClick}
          value={boardState[r][c]}
        />
      );
    }
  }

  return (
    <>
      <div className="grid">{cells}</div>
      <div className="game-stats-container">
        <label className="label-turn">It is {nextPlayer === "player" ? "your" : "CPU's"} turn</label>
        <label className="winner">Winner: {winner} </label>
      </div>
    </>
  );
};
