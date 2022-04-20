import { createSlice } from '@reduxjs/toolkit';

const name = 'RecoverPassword';
const RecoverPasswordSlice = createSlice({
  name,
  initialState: null,
  reducers: {
    RECOVER_PASSWORD_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { RECOVER_PASSWORD_SUCCESS } = RecoverPasswordSlice.actions;
export const RECOVER_PASSWORD_REQUEST = (payload) => ({ type: `${name}/RECOVER_PASSWORD_REQUEST`, payload });
export const RECOVER_PASSWORD_FAILURE = (payload) => ({ type: `${name}/RECOVER_PASSWORD_FAILURE`, payload });

export default RecoverPasswordSlice.reducer;
