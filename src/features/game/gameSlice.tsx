import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { marks } from '../../utils/constants';

export interface GameHistory {
    history: Array<Array<string | null>>;
    nextPlayer: string;
    playerMark: string;
    cpumark: string;
}

const initialState = {
    "gamehistory": [
        [[null, null, null],
        [null, null, null],
        [null, null, null]],
    ],
    boardState: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    "prevPlayer": "",
    "nextPlayer": "cpu",
    "opponent": "cpu",
    "playerMark": "X",
    "cpuMark": "0"
}

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
            // @ts-ignore
            state.boardState[i][j] = mark;
            console.log('append');
            state.prevPlayer = state.nextPlayer;
            state.nextPlayer = mark === state.playerMark ? "cpu" : "player";
            
            /* This is to avoid appending in history when cpu's turn is 
                triggered twice in development during initial mount of 
                the App. React mounts a component immeditely again to avoid bugs in production.
                https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
                https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
            */
            if (state.prevPlayer !== state.nextPlayer) {
                // @ts-ignore
                state.gamehistory.push([[...state.boardState[0]], [...state.boardState[1]], [...state.boardState[2]]]);
            }
        },
        append: (state, action: PayloadAction<Array<Array<string | null>>>) => {
            console.log('append');
             // @ts-ignore
            state.gamehistory.push(action.payload);
        },
        update: (state, action: PayloadAction<number>) => {
            state.gamehistory.splice(action.payload + 1)
        },

        setOpponent: (state, action: PayloadAction<string>) => {
            state.opponent = action.payload;
        },

        setPlayerMark: (state, action: PayloadAction<string>) => {
            state.playerMark = action.payload;

            state.playerMark === marks.X ? state.cpuMark = marks.O : state.cpuMark = marks.X;

            // Remember X goes first.
            if (state.playerMark === marks.X) {
                state.nextPlayer = 'player';
            } else {
                state.nextPlayer = 'cpu'
            }
            // state.nextPlayer = action.payload;
        }
    }
})

// export the actions and reducers from slice file.
export const { append, update, addMarkToBoard, setOpponent, setPlayerMark } = historySlice.actions;

export default historySlice.reducer


// ['apple', 'banana', 'oranges'];