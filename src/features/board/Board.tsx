import { Cell } from './Cell';
import './board.scss';
import { useAppSelector } from '../../app/hooks';
import { Marks, Opponents } from '../../utils/constants';

interface BoardProps {
  boardState: Array<Array<string | null>>;
  prevPlayer: string;
  currentPlayer: string;
  opponent: string;
  playerMark: string;
  cpuMark: string;
  onPlay: (i: number, j: number, mark: string) => void;
}

export const Board = ({
  boardState,
  currentPlayer,
  playerMark,
  onPlay,
}: BoardProps) => {
  const winner = useAppSelector((state) => state.board.winner);
  const cells = [];

  // For the UI state, where should this computation go ?
  let nextPlayerMark =
    currentPlayer === Opponents.PLAYER && playerMark === Marks.X
      ? Marks.X
      : Marks.O;

  const handleCellClick = async (r: number, c: number) => {
    if (winner || boardState[r][c]) {
      return;
    }
    await onPlay(r, c, playerMark);
  };

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      cells.push(
        <Cell
          key={`${r}${c}`}
          row={r}
          col={c}
          nextTurn={currentPlayer}
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
        <label className="label-turn">
          It is {currentPlayer === 'player' ? 'your' : "CPU's"} turn
        </label>
        {winner && <label className="label-winner">Winner: {winner} </label>}
      </div>
    </>
  );
};
