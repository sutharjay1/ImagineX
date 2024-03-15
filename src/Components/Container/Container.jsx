import React, { useEffect } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import useGetImage from '../../Hooks/useGetImage.js';
import Shimmer from './../Shimmer/Shimmer';
import Header from '../Header/Header.jsx';

const Container = () => {
  const query = useSelector((store) => store?.searchQuery?.query);
  const randomImages = useSelector((store) => store?.image?.randomImages);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <Header />
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between p-4 ">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 pb-3 w-full ">
            {randomImages.length === 0 && <Shimmer />}
            {randomImages.map((image, index) => (
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

export default Container;
