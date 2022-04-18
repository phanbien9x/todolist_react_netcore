import { createSlice } from '@reduxjs/toolkit';

const name = 'User';
const UserSlice = createSlice({
  name,
  initialState: null,
  reducers: {
    LOGIN_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { LOGIN_SUCCESS } = UserSlice.actions;
export const LOGIN_REQUEST = (payload) => ({ type: `${name}/LOGIN_REQUEST`, payload });
export const LOGIN_FAILURE = (payload) => ({ type: `${name}/LOGIN_FAILURE`, payload });

export default UserSlice.reducer;
