import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: { message: null, description: null },
};

const LoaderSlice = createSlice({
  name: 'Loader',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.endsWith('_REQUEST'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith('_SUCCESS'),
        (state) => {
          state.loading = false;
          state.error = initialState.error;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith('_FAILURE'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default LoaderSlice.reducer;
