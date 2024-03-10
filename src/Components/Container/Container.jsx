import React, { useEffect } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import useGetImage from '../../Hooks/useGetImage';

const Container = () => {
  const query = useSelector((store) => store?.searchQuery?.query);
  const images = useSelector((store) => store?.image?.images);

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between p-4 ">
      <div className="grid grid-cols-4 gap-4 w-full ">
        {/* {query && images.map((image, index) => <Card image={image} />)} */}
        {images.map((image, index) => (
          <Card image={image} />
        ))}
      </div>
    </div>
  );
};

export default Container;
