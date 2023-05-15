import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { update, append, reset as resetHistory } from '../history/historySlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Marks, Opponents } from '../../utils/constants';
import { RootState } from '../../app/store';

import {
  findBestMove,
  checkWinner,
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
  playerMark: Marks.X,
  cpuMark: Marks.O,
  winner: '',
  restartPrompt: false,
  gameHistoryMode: false,
};

interface Mark {
  i: number;
  j: number;
  mark: string;
}

export const gameSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addMark: (state, action: PayloadAction<Mark>) => {
      const { i, j, mark } = action.payload;
      if (state.currentPlayer === Opponents.PLAYER && i !== -1 && j !== -1) {
        // @ts-ignore
        state.boardState[i][j] = mark;
        state.currentPlayer = Opponents.CPU;

        /* This is to avoid appending in history when cpu's turn is 
          triggered again in development during initial mount of 
          the App. 
          React mounts a component immeditely again to avoid bugs in production.
          https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
          https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
        */
        // if (state.prevPlayer !== state.currentPlayer) {
        // @ts-ignore
      }

      // Check Winner here.
      let winner = checkWinner(state.boardState);

      if (winner) {
        state.winner = winner;
        return;
      }

      /*
        If opponent is cpu and player added mark to board, play cpu automatically.
        If player's mark is O, then CPU plays first.
      */
      if (
        state.opponent === Opponents.CPU &&
        state.currentPlayer === Opponents.CPU
      ) {
        const { i, j } = findBestMove(
          state.boardState,
          state.cpuMark,
          state.playerMark
        );
        // @ts-ignore
        state.boardState[i][j] = state.cpuMark;
        state.currentPlayer = Opponents.PLAYER;
      }

      winner = checkWinner(state.boardState);

      if (winner) {
        state.winner = winner;
      }
      // }
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

    selectOpponent: (state, action: PayloadAction<string>) => {
      state.opponent = action.payload;
    },

    setPlayerMark: (state, action: PayloadAction<Marks>) => {
      state.playerMark = action.payload;

      state.playerMark === Marks.X
        ? (state.cpuMark = Marks.O)
        : (state.cpuMark = Marks.X);

      // Remember X goes first.
      if (state.playerMark === Marks.X) {
        state.currentPlayer = 'player';
      } else {
        state.currentPlayer = Opponents.CPU;
      }
    },

    toggleRestartPrompt: (state, action: PayloadAction<boolean>) => {
      state.restartPrompt = action.payload;
    },

    setGameHistoryMode: (state, action: PayloadAction<boolean>) => {
      state.gameHistoryMode = action.payload;
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
  selectOpponent,
  setPlayerMark,
  toggleRestartPrompt,
  setGameHistoryMode,
} = gameSlice.actions;

// Thunk function
// @ts-ignore
export const playTurn = (data) => async (dispatch, getState) => {
  await dispatch(addMark(data));
  // add to history after mark has been added to the board.
  await dispatch(append(getState().boardState));
};

// @ts-ignore
export const resetGame = () => (dispatch, getState) => {
  dispatch(reset());
  dispatch(resetHistory());
};
export default gameSlice.reducer;
