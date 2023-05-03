import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Marks, GameStates, Opponents } from '../../utils/constants';
import {
  findBestMove,
  checkWinner,
  resetWinningSquares,
} from '../../utils/utils';

export interface GameHistory {
  history: Array<Array<string | null>>;
  nextPlayer: string;
  playerMark: string;
  cpumark: string;
}

const initialState = {
  gamehistory: [
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ],
  boardState: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  prevPlayer: '',
  nextPlayer: Opponents.PLAYER,
  opponent: Opponents.CPU,
  playerMark: Marks.X,
  cpuMark: Marks.O,
  winner: '',
  restartPrompt: false,
  gameStatus: GameStates.NOT_STARTED,
  gameSettings: false,
  gameHistoryMode: false,
};

interface Mark {
  i: number;
  j: number;
  mark: string;
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addMarkToBoard: (state, action: PayloadAction<Mark>) => {
      const { i, j, mark } = action.payload;
      if (state.nextPlayer === 'player' && i !== -1 && j !== -1) {
        // @ts-ignore
        state.boardState[i][j] = mark;
        state.nextPlayer = Opponents.CPU;

        /* This is to avoid appending in history when cpu's turn is 
                    triggered twice in development during initial mount of 
                    the App. React mounts a component immeditely again to avoid bugs in production.
                    https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
                    https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
                */
        // if (state.prevPlayer !== state.nextPlayer) {
        // @ts-ignore
        state.gamehistory.push([
          [...state.boardState[0]],
          [...state.boardState[1]],
          [...state.boardState[2]],
        ]);
      }

      // Check Winner here.
      let winner = checkWinner(state.boardState);

      if (winner) {
        state.winner = winner;
        return;
      }

      // if opponent is cpu and player added mark to board, play cpu automatically.
      if (
        state.opponent === Opponents.CPU &&
        state.nextPlayer === Opponents.CPU
      ) {
        const { i, j } = findBestMove(
          state.boardState,
          state.cpuMark,
          state.playerMark
        );
        // @ts-ignore
        state.boardState[i][j] = state.cpuMark;
        state.gamehistory.push([
          [...state.boardState[0]],
          [...state.boardState[1]],
          [...state.boardState[2]],
        ]);
        state.nextPlayer = 'player';
      }

      winner = checkWinner(state.boardState);

      if (winner) {
        state.winner = winner;
      }
      // }
    },
    append: (state, action: PayloadAction<Array<Array<string | null>>>) => {
      console.log('append');
      // @ts-ignore
      state.gamehistory.push(action.payload);
    },

    reset: (state) => {
      const row = [null, null, null];
      state.boardState = [[...row], [...row], [...row]];
      // splice removes items from start index upto end of array if not specified
      state.gamehistory.splice(1);
      state.restartPrompt = false;
      resetWinningSquares(state.boardState);
    },

    update: (state, action: PayloadAction<number>) => {
      state.gamehistory.splice(action.payload + 1);
      state.boardState = state.gamehistory[state.gamehistory.length - 1];
    },

    setOpponent: (state, action: PayloadAction<string>) => {
      state.opponent = action.payload;
    },

    setPlayerMark: (state, action: PayloadAction<Marks>) => {
      state.playerMark = action.payload;

      state.playerMark === Marks.X
        ? (state.cpuMark = Marks.O)
        : (state.cpuMark = Marks.X);

      // Remember X goes first.
      if (state.playerMark === Marks.X) {
        state.nextPlayer = 'player';
      } else {
        state.nextPlayer = Opponents.CPU;
      }
    },

    setGameStatus: (state, action: PayloadAction<GameStates>) => {
      state.gameStatus = action.payload;

      if (action.payload === GameStates.NOT_STARTED) {
        state.gameSettings = false;
        historySlice.caseReducers.reset(state);
      }
    },

    showGameSettings: (state, action: PayloadAction<boolean>) => {
      state.gameSettings = action.payload;
    },

    toggleRestartPrompt: (state, action: PayloadAction<boolean>) => {
      state.restartPrompt = action.payload;
    },

    setGameHistoryMode: (state, action: PayloadAction<boolean>) => {
      state.gameHistoryMode = action.payload;
    },
  },
});

// export the actions and reducers from slice file.
export const {
  append,
  update,
  reset,
  addMarkToBoard,
  setOpponent,
  setPlayerMark,
  setGameStatus,
  toggleRestartPrompt,
  showGameSettings,
  setGameHistoryMode,
} = historySlice.actions;

export default historySlice.reducer;
