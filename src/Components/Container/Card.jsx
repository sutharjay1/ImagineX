import React, { useState } from 'react';
import ViewImage from './ViewImage';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentViewImage } from '../../store/historySlice.js';
import { IoClose } from 'react-icons/io5';

const Card = ({ image }) => {
  const dispatch = useDispatch();
  const [showImagePanel, setShowImagePanel] = useState(false);

  const query = useSelector((store) => store?.searchQuery?.query);

  const handleShowImagePanel = (image) => {
    setShowImagePanel(true);
    dispatch(setCurrentViewImage(image));
  };

  const handleHideImagePanel = () => {
    setShowImagePanel(false);
  };

  return (
    <>
      <div
        className="relative w-fit h-fit rounded-md overflow-hidden"
        onClick={() => handleShowImagePanel(image)}
      >
        {image?.sponsorship && (
          <p className="absolute top-4 left-2 text-white px-2 py-1 rounded-md">
            Sponsored
          </p>
        )}
        <img
          src={image?.urls?.small}
          key={image?.id}
          alt={image?.alt_description}
          className="w-full rounded-md object-cover transition-transform duration-300 transform hover:scale-110"
          // ^^^ Added 'hover:scale-110' class here
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent "></div>
        <div className="absolute flex items-center bottom-4 left-4 gap-2 text-left rounded-md">
          <img
            src={image?.user?.profile_image?.medium}
            className="w-9 rounded-full"
            key={image?.user?.name}
          />
          <span className="text-base font-medium text-white">
            {image?.user?.name}
          </span>
        </div>
      </div>
      {showImagePanel && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <button
            className="absolute top-4 left-4 text-white text-xl rounded-full bg-gray-800 bg-opacity-50 p-2 hover:bg-opacity-75 lg:block md:block"
            onClick={handleHideImagePanel}
          >
            <IoClose />
          </button>
          <div className="lg:max-w-[95rem] md:max-w-[95rem] sm:max-w-[75rem] max-w-[50rem] w-full lg:p-4 md:p-4 sm:p-4 p-0 ">
            <ViewImage />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
