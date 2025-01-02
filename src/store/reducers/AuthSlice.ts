import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    is2FAFormVisible: false,
    loginError: null,
    verifyError: null,
    userData: null
  },
  reducers: {
    // Login actions
    loginRequest(state, _action) {
        console.log(_action)
        state.loginError = null; // Clear previous login errors
    },
    loginSuccess(state) {
      state.loginError = null;
    },
    loginFailure(state, action) {
      state.loginError = action.payload;
      state.is2FAFormVisible = false;
    },
    show2FAForm(state) {
      state.is2FAFormVisible = true;
    },

    // 2FA verification actions
    verify2FA(state, _action) {
      state.verifyError = null; // Clear previous 2FA errors
    },
    verify2FASuccess(state, action) {
      state.isAuthenticated = true;
      state.is2FAFormVisible = false;
      state.verifyError = null;
      state.userData = action.payload
    },
    verify2FAFailure(state, action) {
      state.verifyError = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  show2FAForm,
  verify2FA,
  verify2FASuccess,
  verify2FAFailure,
} = authSlice.actions;

export default authSlice.reducer;
