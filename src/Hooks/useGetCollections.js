import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../store/imageSlice.js';
import { setCollections } from '../store/collectionSlice.js';

const useGetCollections = () => {
  const dispatch = useDispatch();

  const query = useSelector((store) => store?.searchQuery?.query);
  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);
  const images = useSelector((store) => store?.image?.images);
  const isNewQuery = useSelector((store) => store?.searchQuery?.isNewQuery);

  const multipleClientId = [
    import.meta.env.VITE_API_ONE,
    import.meta.env.VITE_API_TWO,
    import.meta.env.VITE_API_THREE,
    import.meta.env.VITE_API_FOUR,
    import.meta.env.VITE_API_FIVE,
  ];

  let clientId =
    multipleClientId[Math.floor(Math.random() * multipleClientId.length)];

  const getCollections = async () => {
    try {
      const data = await axios.get(
        `https://api.unsplash.com/collections?client_id=${clientId}&count=20&per_page=30&page=${pageNumber}`
      );
      const newResult = data?.data;

      dispatch(setCollections(newResult));
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 403) {
        const index = multipleClientId.indexOf(clientId);
        clientId = multipleClientId[(index + 1) % multipleClientId.length];
        await getImage(); // Retry with the next API key
      }
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
};

export default useGetCollections;
