import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewQuery, setQuery } from '../../store/searchQuery.js';
import { setImages } from '../../store/imageSlice.js';
import { setHistory } from '../../store/historySlice.js';
import { useNavigate } from 'react-router';
import { IoClose } from 'react-icons/io5';

const ViewImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentImage = useSelector((store) => store?.history?.currentViewImage);
  const isNewQuery = useSelector((store) => store?.searchQuery?.isNewQuery);

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.download = `${currentImage?.id}.jpg`;
    link.href = currentImage?.urls?.regular;
    document.body.appendChild(link);
    link.onclick = () => {
      URL.revokeObjectURL(link.href);
    };
    document.body.removeChild(link);
  };

  const handleTagQuery = (query) => {
    dispatch(setImages([]));
    dispatch(setQuery(query));
    dispatch(setHistory(query));
    dispatch(setIsNewQuery(false));
    navigate(`/photos?query=${query}`);
  };

  const handleHideImagePanel = () => {
    setShowImagePanel(false);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start bg-black/45 backdrop-blur-md lg:mx-4 md:mx-2 mx-0 lg:mt-28 md:mt-20 mt-44 rounded-lg z-50 overflow-hidden">
        {/* <button
          className="absolute top-4 left-4 text-white text-xl rounded-full bg-zinc-200 bg-opacity-50 p-2 hover:bg-opacity-75 lg"
          onClick={handleHideImagePanel}
        >
          <IoClose />
        </button> */}
        <div className="w-full flex items-center justify-between  bg-black/50 backdrop-blur-md lg:p-5 md:p- p-5">
          <div className="flex items-center gap-4 text-left ">
            <img
              src={currentImage?.user?.profile_image?.medium}
              className="w-9 rounded-full"
              alt={currentImage?.user?.name}
            />
            <span className="text-base font-medium text-zinc-200">
              {currentImage?.user?.name}
            </span>
          </div>
          <button
            className="px-4 py-1 text-zinc-200"
            onClick={handleDownloadImage}
          >
            Download
          </button>
        </div>

        <div className="w-auto h-auto flex items-start justify-center bg-black/45 backdrop-blur-md ">
          <img
            src={currentImage?.urls?.regular}
            className="w-auto h-auto mt-2 object-cover"
            draggable="false"
          />
        </div>

        <div className="w-full flex flex-col items-start justify-start p-4 bg-black/65 backdrop-blur-md text-zinc-200">
          <div className="w-full lg:block md:block hidden gap-3 ">
            <span className="text-base font-normal px-1">Likes</span>
            <span className="text-base font-normal px-1">•</span>
            <span className="text-base font-normal px-1">
              {currentImage?.likes}
            </span>
          </div>
          <div className="w-full lg:hidden md:hidden block">
            <span className="text-base font-normal">
              Likes • {currentImage?.likes}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-wrap items-center justify-start p-4 bg-black/45 backdrop-blur-md text-zinc-800 gap-2">
          {currentImage?.tags?.map((tag) => (
            <span
              key={tag?.title}
              className="px-3 py-2 rounded-md bg-gray-300 capitalize"
              onClick={() => handleTagQuery(tag?.title)}
            >
              {tag?.title}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewImage;
