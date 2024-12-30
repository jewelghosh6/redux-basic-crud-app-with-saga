// src/store/sagas/userSagas.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from '../reducers/UserSlice';

const API_URL = 'https://dummyjson.com/users';

function* fetchUsers(): Generator {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchUsersSuccess(response.data.users)); // assuming 'users' is the response key
  } catch (error:any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* createUser(action: any): Generator {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(createUserSuccess(response.data)); // assuming the new user is returned in response
  } catch (error:any) {
    yield put(createUserFailure(error.message));
  }
}

function* updateUser(action: any): Generator {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updateUserSuccess(response.data)); // assuming the updated user is returned in response
  } catch (error:any) {
    yield put(updateUserFailure(error.message));
  }
}

function* deleteUser(action: any) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteUserSuccess(action.payload)); // return the ID of the deleted user
  } catch (error:any) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* watchUserActions() {
  yield takeEvery(fetchUsersRequest.type, fetchUsers);
  yield takeEvery(createUserRequest.type, createUser);
  yield takeEvery(updateUserRequest.type, updateUser);
  yield takeEvery(deleteUserRequest.type, deleteUser);
}
