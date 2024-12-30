// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './reducers/PostSlice';
import usersReducer from './reducers/UserSlice';

import { postsSaga } from './saga/postsSaga';
import { watchUserActions } from './saga/userSaga';

// import usersReducer from './UserSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(postsSaga);
sagaMiddleware.run(watchUserActions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
