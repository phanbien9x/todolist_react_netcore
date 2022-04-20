import { createSlice } from '@reduxjs/toolkit';

const name = 'Register';
const RegisterSlice = createSlice({
  name,
  initialState: null,
  reducers: {
    REGISTER_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { REGISTER_SUCCESS } = RegisterSlice.actions;
export const REGISTER_REQUEST = (payload) => ({ type: `${name}/REGISTER_REQUEST`, payload });
export const REGISTER_FAILURE = (payload) => ({ type: `${name}/REGISTER_FAILURE`, payload });

export default RegisterSlice.reducer;
