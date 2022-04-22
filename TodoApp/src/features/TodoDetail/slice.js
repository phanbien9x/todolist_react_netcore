import { createSlice } from '@reduxjs/toolkit';

const name = 'TodoDetail';
const TodoDetailSlice = createSlice({
  name,
  initialState: [],
  reducers: {
    TODO_DETAIL_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { TODO_DETAIL_SUCCESS } = TodoDetailSlice.actions;
export const TODO_DETAIL_REQUEST = (payload) => ({ type: `${name}/TODO_DETAIL_REQUEST`, payload });
export const TODO_DETAIL_FAILURE = (payload) => ({ type: `${name}/TODO_DETAIL_FAILURE`, payload });

export default TodoDetailSlice.reducer;
