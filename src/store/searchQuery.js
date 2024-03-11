import { createSlice } from '@reduxjs/toolkit';

const searchQuery = createSlice({
  name: 'searchQuery',
  initialState: {
    query: null,
    pageNumber: 0,
    isNewQuery: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setIsNewQuery: (state, action) => {
      state.isNewQuery = action.payload;
    },
  },
});

export const { setQuery, setPageNumber, setIsNewQuery } = searchQuery.actions;

export default searchQuery.reducer;
