import { createSlice } from '@reduxjs/toolkit';
import { update, append, reset as resetHistory } from '../history/historySlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Opponents } from '../../utils/constants';

export type Winner = 'X' | 'O' | 'draw';
import {
  findBestMove,
  validateBoard,
  resetWinningSquares,
} from '../../utils/utils';

export type Board = Array<Array<string | null>>;
const initialState = {
  boardState: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ] as Board,
  prevPlayer: '',
  currentPlayer: Opponents.PLAYER,
  opponent: Opponents.CPU,
  winner: '',
  restartPrompt: false,
  gameHistoryMode: false,
};

interface Mark {
  i: number;
  j: number;
  mark: string;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addMark: (state, action: PayloadAction<Mark>) => {
      const { i, j, mark } = action.payload;
      // @ts-ignore
      state.boardState[i][j] = mark;
    },
    /**
     * Resets the boardRedux
     * @param state
     */
    reset: (state) => {
      const row = [null, null, null];
      state.boardState = [[...row], [...row], [...row]];
      state.restartPrompt = false;
      resetWinningSquares(state.boardState);
    },

    togglePlayer: (state) => {
      state.currentPlayer =
        state.currentPlayer === Opponents.PLAYER
          ? Opponents.CPU
          : Opponents.PLAYER;
      console.log('toggle player', state.currentPlayer);
    },

    selectOpponent: (state, action: PayloadAction<string>) => {
      state.opponent = action.payload;
    },

    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.currentPlayer = action.payload;
    },

    toggleRestartPrompt: (state, action: PayloadAction<boolean>) => {
      state.restartPrompt = action.payload;
    },

    setGameHistoryMode: (state, action: PayloadAction<boolean>) => {
      state.gameHistoryMode = action.payload;
    },

    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(update, (state, action) => {
      state.boardState = action.payload.board;
    });
  },
});

// export the actions and reducers from slice file.
export const {
  reset,
  addMark,
  togglePlayer,
  setWinner,
  selectOpponent,
  setCurrentPlayer,
  toggleRestartPrompt,
  setGameHistoryMode,
} = boardSlice.actions;

// Thunk function

/** Play player turn, toggle player and append to history */
// const playPlayerTurn = async (dispatch, state, data) => {
//   const p = new Promise((resolve, reject) => {
//     dispatch(addMark(data))
//     dispatch(togglePlayer());
//     // add to history after mark has been added to the board.
//     dispatch(append(state.board.boardState));
//   });
//   return p;
// }

// @ts-ignore
/**
 * This function does 3 things
 * addMark,
 * togglePlayer turn
 * append to history
 * checks winner.
 * If the current player who plays is player, it automatically plays the cpu turn too.
 * @param data
 * @returns
 */
// Thunks
// @ts-ignore
const playAndAppendHistory = (data) => {
  // @ts-ignore
  return async (dispatch, getState) => {
    const state = getState();
    await dispatch(addMark(data));
    await dispatch(togglePlayer());
    // add to history after mark has been added to the board.
    await dispatch(append(state.board.boardState));
  };
};

// @ts-ignore
const checkWinner = () => async (dispatch, getState) => {
  let winner: string = '';
  try {
    winner = await validateBoard(getState().board.boardState);
  } catch (e) {
    console.log('Error computing the winner', e);
  }

  if (winner) {
    return dispatch(setWinner(winner));
  }
};
// @ts-ignore
export const playTurn = (data) => async (dispatch, getState) => {
  let state = getState();
  const { i, j } = data;
  /* This check is to avoid appending in history when cpu's turn is 
      triggered again in development during initial mount of 
      the App. 
      React mounts a component immediately again to avoid bugs in production.
      https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
      https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
  */
  if (state.board.currentPlayer === Opponents.PLAYER && i !== -1 && j !== -1) {
    // await playPlayerTurn(dispatch, state, data);
    await dispatch(playAndAppendHistory(data));
    await dispatch(checkWinner());
  }

  // CPU plays automatically after player has played.
  dispatch(playCPU());
};

// @ts-ignore
export const playCPU = () => async (dispatch, getState) => {
  let state = getState();
  // CPU plays immediately after player has its turn
  if (
    state.board.currentPlayer === Opponents.CPU &&
    state.board.opponent === Opponents.CPU
  ) {
    const { i, j } = findBestMove(
      state.board.boardState,
      state.game.cpuMark,
      state.game.playerMark
    );

    await dispatch(playAndAppendHistory({ i, j, mark: state.game.cpuMark }));
    await dispatch(checkWinner());
  }
};

// @ts-ignore
export const resetGame = () => (dispatch, getState) => {
  dispatch(reset());
  dispatch(resetHistory());
};

export default boardSlice.reducer;
