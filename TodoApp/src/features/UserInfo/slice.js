import { createSlice } from '@reduxjs/toolkit';

const name = 'UserInfo';
const initialState = {
  email: '',
  role: '',
};
const UserInfoSlice = createSlice({
  name,
  initialState,
  reducers: {
    GET_USERINFO_SUCCESS: (state, { payload }) => {
      return payload;
    },
    CHANGE_USERINFO_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { GET_USERINFO_SUCCESS, CHANGE_USERINFO_SUCCESS } = UserInfoSlice.actions;
export const GET_USERINFO_REQUEST = (payload) => ({ type: `${name}/GET_USERINFO_REQUEST`, payload });
export const GET_USERINFO_FAILURE = (payload) => ({ type: `${name}/GET_USERINFO_FAILURE`, payload });
export const CHANGE_USERINFO_REQUEST = (payload) => ({ type: `${name}/CHANGE_USERINFO_REQUEST`, payload });
export const CHANGE_USERINFO_FAILURE = (payload) => ({ type: `${name}/CHANGE_USERINFO_FAILURE`, payload });

export default UserInfoSlice.reducer;
