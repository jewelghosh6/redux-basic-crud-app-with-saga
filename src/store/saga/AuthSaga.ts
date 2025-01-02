import { put, call, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  show2FAForm,
  verify2FA,
  verify2FASuccess,
  verify2FAFailure,
} from '../reducers/AuthSlice';
// import { loginApi, verify2FAApi } from './api';
import axios from 'axios';

// Worker Saga for login
function* handleLogin(action: any):Generator {
  try {
    console.log("Inside handleLogin",action.payload);
    const response = yield call(axios.post, 'https://otcvy-api.vl1.in/api/login/', action.payload); // API for username/password login
    // console.log("response inside handleLogin saga",response);
    if(!response.data.success){
      throw new Error(response.data.message);
    }
    yield put(loginSuccess());
    yield put(show2FAForm()); // Proceed to 2FA only if login succeeds
  } catch (error:any) {
    yield put(loginFailure(error.message)); // Show login error
  }
}

// Worker Saga for 2FA verification
function* handleVerify2FA(action: any):Generator {
  try {
    const response = yield call(axios.post, 'https://otcvy-api.vl1.in/api/login-otp/', action.payload); // API for verifying 2FA code
    if(!response.data.success){
        throw new Error(response.data.message);
    }
    yield put(verify2FASuccess(response.data));
    // Redirect to home page on successful 2FA verification
    // window.location.href = '/feed'; 
  } catch (error:any) {
    yield put(verify2FAFailure(error.message)); // Show 2FA error
  }
}

// Watcher Sagas
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(verify2FA.type, handleVerify2FA);
}
