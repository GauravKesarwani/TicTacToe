import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import gameReducer from '../features/game/gameSlice';
import historyReducer from '../features/history/historySlice';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedBoardReducer = persistReducer(persistConfig, boardReducer);
// const persistedGameReducer = persistReducer(persistConfig, gameReducer);
// const persistedHistoryReducer = persistReducer(persistConfig, historyReducer);

export const store = configureStore({
  reducer: {
    board: boardReducer,
    game: gameReducer,
    history: historyReducer,
  },
});

// export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
