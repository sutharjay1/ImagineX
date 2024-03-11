import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    randomImages: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setRandomImages: (state, action) => {
      state.randomImages = action.payload;
    },
  },
});

export const { setImages, setRandomImages } = imageSlice.actions;

export default imageSlice.reducer;
