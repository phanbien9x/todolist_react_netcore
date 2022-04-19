import { createSlice } from '@reduxjs/toolkit';

const name = 'ChangePassword';
const UserInfoSlice = createSlice({
  name,
  reducers: {
    CHANGE_PASSWORD_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { CHANGE_PASSWORD_SUCCESS } = UserInfoSlice.actions;
export const CHANGE_PASSWORD_REQUEST = (payload) => ({ type: `${name}/CHANGE_PASSWORD_REQUEST`, payload });
export const CHANGE_PASSWORD_FAILURE = (payload) => ({ type: `${name}/CHANGE_PASSWORD_FAILURE`, payload });

export default UserInfoSlice.reducer;
