import { createSlice } from '@reduxjs/toolkit';

const searchQuery = createSlice({
  name: 'searchQuery',
  initialState: {
    query: null,
    pageNumber: 0,
    isNewQuery: false,
    isSearching: false,
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
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});

export const { setQuery, setPageNumber, setIsNewQuery, setIsSearching } =
  searchQuery.actions;

export default searchQuery.reducer;
