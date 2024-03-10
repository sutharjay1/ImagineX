import { createSlice } from '@reduxjs/toolkit';

const searchQuery = createSlice({
  name: 'searchQuery',
  initialState: {
    query: null,
    pageNumber: 0,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { setQuery, setPageNumber } = searchQuery.actions;

export default searchQuery.reducer;
