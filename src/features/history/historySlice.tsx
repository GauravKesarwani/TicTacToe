import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board } from '../board/boardSlice';

export interface GameHistory {
  gameHistory: Array<Board>;
}
const initialState = {
  gamehistory: [
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<{ idx: number; board: Board }>) => {
      state.gamehistory.splice(action.payload.idx + 1);
    },

    append: (state, action: PayloadAction<Board>) => {
      console.log('append');
      const boardState = action.payload;

      // @ts-ignore
      state.gamehistory.push([
        // @ts-ignore
        [...boardState[0]], // @ts-ignore
        [...boardState[1]], // @ts-ignore
        [...boardState[2]],
      ]);
    },

    reset: (state) => {
      state.gamehistory.splice(1);
    },
  },
});

export const { append, update, reset } = historySlice.actions;
export default historySlice.reducer;
