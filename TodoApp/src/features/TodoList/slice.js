import { createSlice } from '@reduxjs/toolkit';

const name = 'TodoList';
const TodoListSlice = createSlice({
  name,
  initialState: [],
  reducers: {
    TODOLIST_LISTING_SUCCESS: (state, { payload }) => {
      return payload;
    },
    TODOLIST_ADD_SUCCESS: (state, { payload }) => {
      state.push(payload);
    },
    TODO_UPDATE_SUCCESS: (state, { payload }) => {
      const current = state.find((item) => item.id === payload.id);
      payload.name !== undefined && (current.name = payload.name);
      payload.priority !== undefined && (current.priority = payload.priority);
      payload.completed !== undefined && (current.completed = payload.completed);
    },
    TODO_DELETE_SUCCESS: (state, { payload }) => {
      return state.filter((item) => item.id !== payload.id);
    },
  },
});

export const { TODOLIST_LISTING_SUCCESS, TODOLIST_ADD_SUCCESS, TODO_UPDATE_SUCCESS, TODO_DELETE_SUCCESS } =
  TodoListSlice.actions;
export const TODOLIST_LISTING_REQUEST = (payload) => ({ type: `${name}/TODOLIST_LISTING_REQUEST`, payload });
export const TODOLIST_LISTING_FAILURE = (payload) => ({ type: `${name}/TODOLIST_LISTING_FAILURE`, payload });
export const TODOLIST_ADD_REQUEST = (payload) => ({ type: `${name}/TODOLIST_ADD_REQUEST`, payload });
export const TODOLIST_ADD_FAILURE = (payload) => ({ type: `${name}/TODOLIST_ADD_FAILURE`, payload });
export const TODO_UPDATE_REQUEST = (payload) => ({ type: `${name}/TODO_UPDATE_REQUEST`, payload });
export const TODO_UPDATE_FAILURE = (payload) => ({ type: `${name}/TODO_UPDATE_FAILURE`, payload });
export const TODO_DELETE_REQUEST = (payload) => ({ type: `${name}/TODO_DELETE_REQUEST`, payload });
export const TODO_DELETE_FAILURE = (payload) => ({ type: `${name}/TODO_DELETE_FAILURE`, payload });

export default TodoListSlice.reducer;
