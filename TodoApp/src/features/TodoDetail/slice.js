import { createSlice } from '@reduxjs/toolkit';

const name = 'TodoDetail';
const TodoDetailSlice = createSlice({
  name,
  initialState: [],
  reducers: {
    TODO_DETAIL_SUCCESS: (state, { payload }) => {
      return payload;
    },
    TODO_UPDATE_SUCCESS: (state, { payload }) => {
      return payload;
    },
  },
});

export const { TODO_DETAIL_SUCCESS, TODO_UPDATE_SUCCESS } = TodoDetailSlice.actions;
export const TODO_DETAIL_REQUEST = (payload) => ({ type: `${name}/TODO_DETAIL_REQUEST`, payload });
export const TODO_DETAIL_FAILURE = (payload) => ({ type: `${name}/TODO_DETAIL_FAILURE`, payload });
export const TODO_UPDATE_REQUEST = (payload) => ({ type: `${name}/TODO_UPDATE_REQUEST`, payload });
export const TODO_UPDATE_FAILURE = (payload) => ({ type: `${name}/TODO_UPDATE_FAILURE`, payload });

export default TodoDetailSlice.reducer;
