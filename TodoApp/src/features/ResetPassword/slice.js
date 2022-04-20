import { createSlice } from '@reduxjs/toolkit';

const name = 'ResetPassword';
const ResetPasswordSlice = createSlice({
  name,
  initialState: null,
  reducers: {
    RESET_PASSWORD_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { RESET_PASSWORD_SUCCESS } = ResetPasswordSlice.actions;
export const RESET_PASSWORD_REQUEST = (payload) => ({ type: `${name}/RESET_PASSWORD_REQUEST`, payload });
export const RESET_PASSWORD_FAILURE = (payload) => ({ type: `${name}/RESET_PASSWORD_FAILURE`, payload });

export default ResetPasswordSlice.reducer;
