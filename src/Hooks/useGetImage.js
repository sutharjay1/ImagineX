import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../store/imageSlice.js';

const clientId = 'cWhqebO7qsTYKhipotHNSydroNIEy2wTVsEJ3qCsPJc';

const useGetImage = () => {
  const dispatch = useDispatch();

  const query = useSelector((store) => store?.searchQuery?.query);
  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);
  const images = useSelector((store) => store?.image?.images);
  const isNewQuery = useSelector((store) => store?.searchQuery?.isNewQuery);

  const getImage = async () => {
    try {
      if (!query) return;

      const data = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}&per_page=20&page=${pageNumber}`
      );
      const newResult = data?.data?.results;

      isNewQuery
        ? dispatch(setImages([...newResult, ...images]))
        : dispatch(setImages([...images, ...newResult]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, [query, pageNumber]);
};

export default useGetImage;
