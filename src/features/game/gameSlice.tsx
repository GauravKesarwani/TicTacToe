import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { marks } from '../../utils/constants';
import { findBestMove, checkWinner } from '../../utils/utils';

export interface GameHistory {
    history: Array<Array<string | null>>;
    nextPlayer: string;
    playerMark: string;
    cpumark: string;
}

const initialState = {
    gamehistory: [
        [[null, null, null],
        [null, null, null],
        [null, null, null]],
    ],
    boardState: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    prevPlayer: "",
    nextPlayer: "player",
    opponent: "cpu",
    playerMark: marks.X,
    cpuMark: marks.O,
    winner: ""
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
            if (state.nextPlayer === "player" && i !== -1 && j !== - 1) {
                  // @ts-ignore
                state.boardState[i][j] = mark;
                state.nextPlayer = "cpu";
                
                /* This is to avoid appending in history when cpu's turn is 
                    triggered twice in development during initial mount of 
                    the App. React mounts a component immeditely again to avoid bugs in production.
                    https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
                    https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
                */
                // if (state.prevPlayer !== state.nextPlayer) {
                    // @ts-ignore
                state.gamehistory.push([[...state.boardState[0]], [...state.boardState[1]], [...state.boardState[2]]]);
            }
          
            // Check Winner here.
            let winner = checkWinner(state.boardState);

            if (winner) {
                state.winner = winner;
                return;
            }

            // if opponent is cpu and player added mark to board, play cpu automatically.
            if (state.opponent === "cpu" && state.nextPlayer === "cpu") {
                const { i, j } = findBestMove(state.boardState, state.cpuMark, state.playerMark);
                // @ts-ignore
                state.boardState[i][j] = state.cpuMark;
                state.gamehistory.push([[...state.boardState[0]], [...state.boardState[1]], [...state.boardState[2]]]);
                state.nextPlayer = "player";
              
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
            state.gamehistory.splice(1)
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
export const { append, update, reset, addMarkToBoard, setOpponent, setPlayerMark } = historySlice.actions;

export default historySlice.reducer
