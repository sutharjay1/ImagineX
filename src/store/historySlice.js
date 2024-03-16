import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    history: [],
    currentViewImage: '',
  },
  reducers: {
    setHistory: (state, action) => {
      if(state.history.includes(action.payload)) return
      state.history = [...state.history.join(',').split(','), action.payload];
    },
    setCurrentViewImage: (state, action) => {
      state.currentViewImage = action.payload;
    },
  },
});

export const { setHistory, setCurrentViewImage } = historySlice.actions;

export default historySlice.reducer;
