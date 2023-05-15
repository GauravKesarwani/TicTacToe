import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameStates } from '../../utils/constants';

const initialState = {
  status: GameStates.NOT_STARTED,
  gameSettings: false,
};
export const appSlice = createSlice({
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
  },
});

export const { setStatus, showGameSettings } = appSlice.actions;
export default appSlice.reducer;
