import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './reducers/PostSlice';
import usersReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import { postsSaga } from './saga/postsSaga';
import { watchUserActions } from './saga/userSaga';
import { usersApi } from './api/UserApiSlice';
import { postsApi } from './api/PostApiSlice';
import { authSaga } from './saga/AuthSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Regular users reducer
    posts: postsReducer, // Regular posts reducer
    auth: authReducer, // Regular auth reducer
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() // Disable thunk, since RTK Query handles async actions
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(sagaMiddleware), // Add saga middleware
  devTools: true, // Enable Redux DevTools extension
});

// Run saga watchers
sagaMiddleware.run(postsSaga);
sagaMiddleware.run(watchUserActions);
sagaMiddleware.run(authSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
