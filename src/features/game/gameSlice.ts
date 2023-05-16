import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameStates, Marks, Opponents } from '../../utils/constants';
import { setCurrentPlayer } from '../board/boardSlice';

const initialState = {
  status: GameStates.NOT_STARTED,
  playerMark: Marks.X,
  cpuMark: Marks.O,
  gameSettings: false,
  winner: '',
};
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStates>) => {
      state.status = action.payload;

      if (action.payload === GameStates.NOT_STARTED) {
        state.gameSettings = false;
      }
    },

    showGameSettings: (state, action: PayloadAction<boolean>) => {
      state.gameSettings = action.payload;
    },

    setPlayerMark: (state, action: PayloadAction<Marks>) => {
      state.playerMark = action.payload;

      state.playerMark === Marks.X
        ? (state.cpuMark = Marks.O)
        : (state.cpuMark = Marks.X);
    },

    setWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload;
    },
  },
});

export const { setStatus, setWinner, showGameSettings, setPlayerMark } =
  gameSlice.actions;

// Thunks
// @ts-ignore
export const selectPlayer = (data) => async (dispatch, getState) => {
  dispatch(setPlayerMark(data));

  const state = getState();
  let currentPlayer;
  // Remember X goes first.
  if (state.game.playerMark === Marks.X) {
    currentPlayer = Opponents.PLAYER;
  } else {
    currentPlayer = Opponents.CPU;
  }
  await dispatch(setCurrentPlayer(currentPlayer));
};

export default gameSlice.reducer;
