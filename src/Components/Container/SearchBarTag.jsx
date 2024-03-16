import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsNewQuery,
  setIsSearching,
  setQuery,
} from '../../store/searchQuery';
import { setImages } from '../../store/imageSlice';
import { setHistory } from '../../store/historySlice';
import { useNavigate } from 'react-router';

const SearchBarTag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useSelector((store) => store?.history?.history);

  const handleTagQuery = (query) => {
    dispatch(setImages([]));
    dispatch(setQuery(query));
    dispatch(setHistory(query));
    dispatch(setIsNewQuery(false));
    dispatch(setIsSearching(false));
    navigate(`/photos?query=${query}`);
  };

  return (
    <>
      <div className="absolute right-0 top-[calc(100%+0.3rem)] lg:w-[600px] sm:w-[400px] w-full  md:block hidden bg-black/80 backdrop-blur-sm p-4 rounded-md border-[1px] border-zinc-600 space-y-2 lg:flex flex-col ">
        <h1 className="text-white text-lg font-bold">Recent Searches</h1>
        <div className="flex items-center cursor-pointer w-fit gap-3 flex-wrap">
          {history
            .filter((item) => item.trim() !== '' && item.match(item))
            ?.map((item, index) => (
              <span
                className="text-sm px-3 py-3 capitalize bg-black/50 text-zinc-200 rounded-md border-[1px] border-zinc-700"
                onClick={() => handleTagQuery(item)}
              >
                {item}
              </span>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchBarTag;
