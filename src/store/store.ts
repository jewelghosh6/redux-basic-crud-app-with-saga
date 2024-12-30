import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './reducers/PostSlice';
import usersReducer from './reducers/UserSlice';
import { postsSaga } from './saga/postsSaga';
import { watchUserActions } from './saga/userSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Regular users reducer
    posts: postsReducer, // Regular posts reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }) // Disable thunk, since RTK Query handles async actions
      .concat(sagaMiddleware),// Add saga middleware
  devTools: true, // Enable Redux DevTools extension
});

// Run saga watchers
sagaMiddleware.run(postsSaga);
sagaMiddleware.run(watchUserActions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
