import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRandomImages } from '../store/imageSlice.js';

// const clientId = import.meta.env.VITE_API_ONE;
const clientId = import.meta.env.VITE_API_TWO;
// const clientId = import.meta.env.VITE_API_THREE;

const useGetRandomImage = () => {
  const dispatch = useDispatch();

  const randomImages = useSelector((store) => store?.image?.randomImages);

  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);

  const getRandomImage = async () => {
    try {
      const data = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${clientId}&count=20&per_page=20&page=${pageNumber}`
      );
      const newResult = data?.data;
      dispatch(setRandomImages([...randomImages, ...newResult]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomImage();
  }, [pageNumber]);
};

export default useGetRandomImage;
