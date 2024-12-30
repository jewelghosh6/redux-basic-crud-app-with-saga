// src/store/postsSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  updatePostRequest,
  deletePostRequest,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
} from '../reducers/PostSlice';

const API_URL = 'https://dummyjson.com/posts';

// Fetch posts from API
function* fetchPostsSaga(): Generator  {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchPostsSuccess(response.data.posts));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* addPostSaga(action: any): Generator {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addPostSuccess(response.data.posts));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* updatePostSaga(action: any): Generator {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updatePostSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* deletePostSaga(action: any): Generator {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deletePostSuccess(action.payload));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

// Watcher saga
export function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(addPostRequest.type, addPostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);

}
