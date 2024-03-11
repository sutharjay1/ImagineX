import React, { useState } from 'react';
import ViewImage from './ViewImage';
import { useDispatch } from 'react-redux';
import { setCurrentViewImage } from '../../store/historySlice.js';
import { IoClose } from 'react-icons/io5';

const Card = ({ image }) => {
  const dispatch = useDispatch();
  const [showImagePanel, setShowImagePanel] = useState(false);

  const handleShowImagePanel = (image) => {
    setShowImagePanel(true);
    dispatch(setCurrentViewImage(image));
  };

  const handleHideImagePanel = () => {
    setShowImagePanel(false);
  };

  const handleImagePanelClick = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
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
          src={image?.urls?.regular}
          key={image?.id}
          alt={image?.alt_description}
          className="z-0 h-full w-full rounded-md object-cover"
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
        <div
          className="fixed z-10 inset-0 flex items-center justify-center overflow-y-scroll"
          onClick={handleHideImagePanel}
        >
          <button
            className="absolute top-0 left-0 my-3 mx-2 text-zinc-200 hover:text-zinc-300"
            onClick={handleHideImagePanel}
          >
            <IoClose size={30} />
          </button>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="w-full h-40 absolute top-0 mx-auto mt-10 z-50"
            onClick={handleImagePanelClick}
          >
            <div className=" p-4 rounded-md mr-20 ">
              <ViewImage />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
