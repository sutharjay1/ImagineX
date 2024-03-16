import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import Shimmer from './../Shimmer/Shimmer';
import Header from '../Header/Header.jsx';
import CollectionTag from './CollectionTag.jsx';

const Container = () => {
  const query = useSelector((store) => store?.searchQuery?.query);
  const randomImages = useSelector((store) => store?.image?.randomImages);

  return (
    <>
      <div className="w-full flex items-center justify-center overflow-x-hidden">
        <div className="w-full flex flex-col items-center justify-center">
          <Header />
          <div className="lg:max-w-7xl md:max-w-5xl max-w-full  mx-auto flex flex-col items-center justify-between px-4 py-2">
            <div className="w-full overflow-x-auto">
              <CollectionTag />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-1 w-full">
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
      </div>
    </>
  );
};

export default Container;
