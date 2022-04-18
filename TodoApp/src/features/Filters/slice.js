import { createSlice } from '@reduxjs/toolkit';

const FiltersSlice = createSlice({
  name: 'Filters',
  initialState: {
    search: '',
    status: 'All',
    priorities: [],
  },
  reducers: {
    FILTERS_CHANGE_SEARCH: (state, { payload }) => {
      state.search = payload;
    },
    FILTERS_CHANGE_STATUS: (state, { payload }) => {
      state.status = payload;
    },
    FILTERS_CHANGE_PRIORITIES: (state, { payload }) => {
      state.priorities = payload;
    },
  },
});

export const { FILTERS_CHANGE_SEARCH, FILTERS_CHANGE_STATUS, FILTERS_CHANGE_PRIORITIES } = FiltersSlice.actions;

export default FiltersSlice.reducer;
