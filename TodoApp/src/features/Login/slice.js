import { createSlice } from '@reduxjs/toolkit';

const name = 'Login';
const LoginSlice = createSlice({
  name,
  initialState: null,
  reducers: {
    LOGIN_SUCCESS: (state, { payload }) => {
      return payload;
    },
    LOGOUT_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { LOGIN_SUCCESS, LOGOUT_SUCCESS } = LoginSlice.actions;
export const LOGIN_REQUEST = (payload) => ({ type: `${name}/LOGIN_REQUEST`, payload });
export const LOGIN_FAILURE = (payload) => ({ type: `${name}/LOGIN_FAILURE`, payload });
export const LOGOUT_REQUEST = (payload) => ({ type: `${name}/LOGOUT_REQUEST`, payload });
export const LOGOUT_FAILURE = (payload) => ({ type: `${name}/LOGOUT_FAILURE`, payload });

export default LoginSlice.reducer;
