import { Cell } from "./Cell";
import { useState, useEffect } from "react";

interface BoardProps {
  boardState: Array<string>;
  nextPlayer: string;
  onPlay: (boardState: Array<string>) => void;
}
export const Board = ({ boardState, nextPlayer, onPlay }: BoardProps) => {
  const [winner, setWinner] = useState("");
  const cells = [];

  const highlightWinningSquares = (
    row: number | undefined,
    col: number | undefined,
    diagonal: string | undefined
  ) => {
    if (row !== undefined) {
      for (let c = 0; c < 3; c++) {
        const el = document.querySelector(`[data-id="${row}${c}"]`);
        el?.classList.add("winner");
      }
    }

    if (col !== undefined) {
      for (let r = 0; r < 3; r++) {
        const el = document.querySelector(`[data-id="${r}${col}"]`);
        el?.classList.add("winner");
      }
    }

    if (diagonal !== undefined) {
      if (diagonal === "left") {
        document.querySelector(`[data-id="00"]`)?.classList.add("winner");
        document.querySelector(`[data-id="11"]`)?.classList.add("winner");
        document.querySelector(`[data-id="22"]`)?.classList.add("winner");
      }

      if (diagonal === "right") {
        document.querySelector(`[data-id="02"]`)?.classList.add("winner");
        document.querySelector(`[data-id="11"]`)?.classList.add("winner");
        document.querySelector(`[data-id="20"]`)?.classList.add("winner");
      }
    }
  };

  const checkWinner = () => {
    let winner = "";
    for (let r = 0; r < 3; r++) {
      if (
        boardState[r * 3 + 0] !== null &&
        boardState[r * 3 + 0] === boardState[r * 3 + 1] &&
        boardState[r * 3 + 1] === boardState[r * 3 + 2]
      ) {
        if (boardState[r * 3 + 0] === "X") {
          winner = "X";
        } else if (boardState[r * 3 + 0] === "0") {
          winner = "0";
        }

        console.log("check winner", boardState);
        highlightWinningSquares(r, undefined, undefined);
        // document.querySelector(".cell[data-id=01]")
      }
    }

    for (let c = 0; c < 3; c++) {
      if (
        boardState[c] !== null &&
        boardState[c] === boardState[c + 3] &&
        boardState[c + 3] === boardState[c + 6]
      ) {
        if (boardState[c] === "X") {
          winner = "X";
        } else if (boardState[c] === "0") {
          winner = "0";
        }
        highlightWinningSquares(undefined, c, undefined);
      }
    }

    if (
      boardState[0] &&
      boardState[0] === boardState[4] &&
      boardState[4] === boardState[8]
    ) {
      if (boardState[0] === "X") {
        winner = "X";
      } else if (boardState[0] === "0") {
        winner = "0";
      }

      highlightWinningSquares(undefined, undefined, "left");
    }

    if (
      boardState[2] &&
      boardState[2] === boardState[4] &&
      boardState[4] === boardState[6]
    ) {
      if (boardState[2] === "X") {
        winner = "X";
      } else if (boardState[2] === "0") {
        winner = "0";
      }
      highlightWinningSquares(undefined, undefined, "right");
    }

    setWinner(winner);
  };

  const handleCellClick = (idx: number) => {
    if (winner || boardState[idx]) {
      return;
    }
    const nextState = boardState.slice();

    if (nextPlayer === "X") {
      // setNextPlayer("0");
      nextState[idx] = "X";
    } else {
      // setNextPlayer("X");
      nextState[idx] = "0";
    }
    onPlay(nextState);
  };

  useEffect(() => {
    checkWinner();
  }, [boardState]);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      cells.push(
        <Cell
          key={`${r}${c}`}
          row={r}
          col={c}
          handleCellClick={handleCellClick}
          value={boardState[idx]}
        />
      );
    }
  }

  return (
    <>
      <div>Next Player: {nextPlayer}</div>
      <div className="grid">{cells}</div>
      <div>Winner: {winner} </div>
    </>
  );
};
