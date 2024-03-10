import React, { useState } from 'react';

const Card = ({ image }) => {
  const [showImagePanel, setShowImagePanel] = useState(false);

  const handleShowImagePanel = () => {
    setShowImagePanel(!showImagePanel);
  };

  return (
    <>
      <div
        className="relative w-fit h-fit rounded-md overflow-hidden"
        onClick={handleShowImagePanel}t
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
    </>
  );
};

export default Card;
