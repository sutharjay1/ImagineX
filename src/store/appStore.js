import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice.js';
import searchQueryReducer from './searchQuery.js';
import historyReducer from './historySlice.js';
import collectionReducer from './collectionSlice.js';

const appStore = configureStore({
  reducer: {
    image: imageReducer,
    searchQuery: searchQueryReducer,
    history: historyReducer,
    collection: collectionReducer,
  },
});

export default appStore;
