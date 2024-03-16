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

  const handleDownloadImage = (e) => {
    e.preventDefault();
    const imageUrl = currentImage?.links?.download;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${currentImage?.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTagQuery = (query) => {
    dispatch(setImages([]));
    dispatch(setQuery(query));
    dispatch(setHistory(query));
    dispatch(setIsNewQuery(false));
    navigate(`/photos?query=${query}`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-start bg-black/35 backdrop-blur-lg lg:mr-40 md:mx-2 mx-0 lg:mt-14 md:mt-14 mt-14 rounded-lg z-50 overflow-y-auto">
        <div className="w-full flex items-center justify-between  bg-black/5 backdrop-blur-lg lg:p-5 md:p- p-5">
          <div className="flex items-center gap-4 text-left">
            <img
              src={currentImage?.user?.profile_image?.medium}
              className="w-9 rounded-full"
              alt={currentImage?.user?.name}
              download={`${currentImage?.id}.jpg`}
            />
            <span className="text-base font-medium text-zinc-200">
              {currentImage?.user?.name}
            </span>
          </div>

          <a
            href={currentImage?.urls?.full}
            download={`${currentImage?.id}.jpg`}
          >
            <button
              className="px-4 py-1 text-zinc-200"
              onClick={(e) => handleDownloadImage(e)}
            >
              Download
            </button>
          </a>

          {/* <button
            className="px-4 py-1 text-zinc-200"
            onClick={(e) => handleDownloadImage(e)}
          >
            Download
          </button> */}
        </div>

        <div className="w-auto lg:h-[75%] md:h-[75%] h-[70%] flex items-start justify-center bg-black/40 backdrop-blur-lg">
          <img
            src={currentImage?.urls?.regular}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>

        <div className="w-full flex flex-col gap-1 items-center justify-center p-4 bg-black/5 backdrop-blur-lg text-zinc-200">
          <div className="w-full lg:block md:block hidden gap-3">
            <span className="text-base font-normal px-1">Views</span>
            <span className="text-base font-normal px-1">•</span>
            <span className="text-base font-normal px-1">
              {currentImage?.views || '-'}
            </span>
          </div>

          <div className="w-full lg:block md:block hidden gap-3">
            <span className="text-base font-normal px-1">Likes</span>
            <span className="text-base font-normal px-1">•</span>
            <span className="text-base font-normal px-1">
              {currentImage?.likes || '-'}
            </span>
          </div>
          <div className="w-full lg:block md:block hidden gap-3">
            <span className="text-base font-normal px-1">Downloads</span>
            <span className="text-base font-normal px-1">•</span>
            <span className="text-base font-normal px-1">
              {currentImage?.downloads || '-'}
            </span>
          </div>

          <div className="w-full lg:hidden md:hidden block">
            <div className="w-full flex flex-col items-start justify-between space-y-1">
              <span className="text-base font-normal">
                Views • {currentImage?.views || '-'}
              </span>
              <span className="text-base font-normal">
                Likes • {currentImage?.likes || '-'}
              </span>
              <span className="text-base font-normal">
                Downloads • {currentImage?.downloads || '-'}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-wrap items-center justify-start px-4 bg-black/40 backdrop-blur-lg text-zinc-800 gap-2 overflow-x-auto pb-4">
            {currentImage?.tags?.map((tag) => (
              <span
                key={tag?.title}
                className="text-sm px-3 py-2 capitalize bg-zinc-800 text-zinc-300 rounded-md border-[1px] border-zinc-600"
                onClick={() => handleTagQuery(tag?.title)}
              >
                {tag?.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewImage;
