import { marks } from "./constants";

const areMovesLeft = (boardState: Array<Array<string | null>>) => {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (boardState[r][c] === null) return true;
    }
  }

  return false;
}

// Evaluation or heuristic function in Game Theory
const evaluation = (boardState: Array<Array<string | null>>) => {
    for (let r = 0; r < 3; r++) {
      if (
        boardState && boardState[r][0] !== null &&
        boardState[r][0] === boardState[r][1] &&
        boardState[r][1] === boardState[r][2]
      ) {
          return boardState[r][0] === "X" ? 10 : -10;
      }
    }

    for (let c = 0; c < 3; c++) {
      if (
        boardState && boardState[0][c] !== null &&
        boardState[0][c] === boardState[1][c] &&
        boardState[1][c] === boardState[2][c]
      ) {
          return boardState[0][c] === marks.X ? 10 : -10;
      }
    }

    if (
      boardState[0][0] &&
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2]
    ) {
      return boardState[0][0] === marks.X ? 10 : -10;
    }

    if (
      boardState[0][2] &&
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0]
    ) {
        return boardState[0][2] === marks.X ? 10 : -10;
    }

    return 0;
  };



  /* This function will always be called when it is cpu's turn. 
   ** CPU is the minimizing player.
   * This assumes the opponent also play optimally.
   */

export const findBestMove = (board: Array<Array<string | null>>, cpuMark = "0", playerMark = "X") => {
    let bestScore = Number.POSITIVE_INFINITY;
    const tempBoard = [[...board[0]], [...board[1]], [...board[2]]];
    let move = { i: -1, j: -1 };
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // For all the available spots, the minimizing player takes turn and invokes minimax algorithm recursively
            if (tempBoard[i][j] === null) {
                tempBoard[i][j] = cpuMark;
                // cpu is the minimizing player.
           
                // next turn is that of the maximizing player
                let score = miniMax(tempBoard, 0, true, cpuMark, playerMark);

                /* Since we assume that CPU is the minimizing player so best score will be the minimum 
                  and best move will be the move which makes the score minimum
                  */
                if (score < bestScore) {
                    bestScore = score;
                    move = {i, j}
                }
                tempBoard[i][j] = null
            }
        }
    }

    return { i: move?.i, j: move?.j };
}


// this is a recursive utility function.
/**
 * 
 * @param board 
 * @param cpuMark 
 * @param depth 
 * @param isMaximizing boolean variable to indicate whether you want to find the best score for maximizer player or minimizer player.
 * @returns 
 */
function miniMax(board:  Array<Array<string | null>>, depth: number, isMaximizing: boolean, cpuMark: string, playerMark: string) {
    let result = evaluation(board);
    /**
     * Base Cases.
     */
    // if either player has won, return the result, else keep calling the function recursively  
    if (result === 10 || result === -10) return result;

    // If either player has not won and no move is left then there is a tie
    if (areMovesLeft(board) === false) return 0;
    if (isMaximizing) {
        let bestScore = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available
                if (board[i][j] === null) {
                    board[i][j] = playerMark;
                    bestScore = Math.max(miniMax(board, depth + 1, !isMaximizing, cpuMark, playerMark), bestScore)
                    board[i][j] = null
                }
            }
        }

        return bestScore;
    } else {
        let bestScore = Number.POSITIVE_INFINITY;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available
                if (board[i][j] === null) {
                    board[i][j] = cpuMark;
                    bestScore = Math.min(miniMax(board, depth + 1, !isMaximizing, cpuMark, playerMark), bestScore)
                    board[i][j] = null
                }
            }
        }

        return bestScore;
    }
}

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


export const checkWinner = (boardState: Array<Array<string | null>>) => {
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
    if (boardState[0][0] === marks.X) {
      winner = marks.X;
    } else if (boardState[0][0] === marks.O) {
      winner = marks.O;
    }

    highlightWinningSquares(undefined, undefined, "left");
  }

  // right diagonal
  if (
    boardState[0][2] &&
    boardState[0][2] === boardState[1][1] &&
    boardState[1][1] === boardState[2][0]
  ) {
    if (boardState[0][2] === marks.X) {
      winner = marks.X;
    } else if (boardState[0][2] === marks.O) {
      winner = marks.O;
    }
    highlightWinningSquares(undefined, undefined, "right");
  }

  return winner;
};


// This is typical DFS algorithm. This is using stack.
// Applying the lazy manager analogy here. After the lazy manager fills the spot with either "X" or "0", it calls the sub-ordinate in the hierarchy.
// The subordiate evaluates the board and immediately returns if the board has winning state. 
// If the board does not have winning state and there are moves left, the subordinate calls the minimax recursively with the turn 