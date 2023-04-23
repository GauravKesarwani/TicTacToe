import { Cell } from "./Cell";
import { useState, useEffect } from "react";
import "./board.scss";

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
  const [winner, setWinner] = useState("");
  const cells = [];

  useEffect(() => {
    checkWinner();
  }, [boardState]);

  
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
        boardState && boardState[r][0] !== null &&
        boardState[r][0] === boardState[r][1] &&
        boardState[r][1] === boardState[r][2]
      ) {
        if (boardState[r][0] === "X") {
          winner = "X";
        } else if (boardState[r][0] === "0") {
          winner = "0";
        }

        console.log("check winner", boardState);
        highlightWinningSquares(r, undefined, undefined);
      }
    }

    for (let c = 0; c < 3; c++) {
      if (
        boardState && boardState[0][c] !== null &&
        boardState[0][c] === boardState[1][c] &&
        boardState[1][c] === boardState[2][c]
      ) {
        if (boardState[0][c] === "X") {
          winner = "X";
        } else if (boardState[1][c] === "0") {
          winner = "0";
        }
        highlightWinningSquares(undefined, c, undefined);
      }
    }

    // left diagonal
    if (
      boardState[0][0] &&
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2]
    ) {
      if (boardState[0][0] === "X") {
        winner = "X";
      } else if (boardState[0][0] === "0") {
        winner = "0";
      }

      highlightWinningSquares(undefined, undefined, "left");
    }

    // right diagonal
    if (
      boardState[0][2] &&
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0]
    ) {
      if (boardState[0][2] === "X") {
        winner = "X";
      } else if (boardState[0][2] === "0") {
        winner = "0";
      }
      highlightWinningSquares(undefined, undefined, "right");
    }

    setWinner(winner);
  };

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
        <label className="label-turn">TURN: {nextPlayer}</label>
        <label className="winner">Winner: {winner} </label>
      </div>
    </>
  );
};
