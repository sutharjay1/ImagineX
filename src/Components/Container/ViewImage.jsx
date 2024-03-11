import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewQuery, setQuery } from '../../store/searchQuery.js';

const ViewImage = () => {
  const dispatch = useDispatch();
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
    dispatch(setQuery(query));
    dispatch(setIsNewQuery(false));
  };

  return (
    <>
      <div
        className={`w-full h-screen flex flex-col items-center justify-start bg-zinc-700/70 mx-14 rounded-lg overflow-hidden `}
      >
        <div className="w-full flex items-center justify-between p-4 bg-[#ffffff]">
          <div className="flex items-center bottom-4 left-4 gap-2 text-left rounded-md">
            <img
              src={currentImage?.user?.profile_image?.medium}
              className="w-9 rounded-full"
              key={currentImage?.user?.name}
            />
            <span className="text-base font-medium text-white">
              {currentImage?.user?.name}
            </span>
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              className="px-4 py-1 text-white"
              onClick={handleDownloadImage}
            >
              Download
            </button>
          </div>
        </div>
        <div className="w-full h-[65%] flex items-center justify-center bg-[#ffffff]">
          <img
            src={currentImage?.urls?.regular}
            className="w-auto h-full "
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start p-9 bg-[#ffffff] text-zinc-800">
          <span className="text-base font-normal">Likes</span>
          <span className="text-base font-normal">{currentImage?.likes}</span>
        </div>
        <div className="w-full flex items-center justify-start p-10 bg-[#ffffff] text-zinc-800 gap-4">
          {currentImage?.tags?.map((tag) => (
            <span
              className="px-3 py-2 rounded-md bg-[#d6d6d6] capitalize"
              key={tag?.title}
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
