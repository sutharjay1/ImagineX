import React, { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewQuery, setQuery } from '../../store/searchQuery.js';
import { useLocation, useParams } from 'react-router';
import Header from '../Header/Header.jsx';
import Shimmer from '../Shimmer/Shimmer.jsx';

const SearchImageContainer = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(setQuery(query));
      dispatch(setIsNewQuery(true));
      setTimeout(() => {
        dispatch(setIsNewQuery(false));
      }, 1000);
    }
  }, [dispatch, query]);

  const images = useSelector((store) => store?.image?.images);

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <Header />
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-start p-4">
          <div className="w-full flex flex-col items-start justify-start pt-1 space-y-1">
            <h1 className="lg:text-3xl md:text-2xl text-xl text-zinc-300">
              Search Results for{' '}
              <span className="font-bold text-zinc-200 capitalize">
                {query}
              </span>
            </h1>
            <span>Showing {images.length} results</span>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-3 w-full ">
            {images.length === 0 && <Shimmer />}
            {images.map((image, index) => (
              <Card
                key={index}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchImageContainer;
