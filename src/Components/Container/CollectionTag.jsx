import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../../store/imageSlice';
import { setIsNewQuery, setQuery } from '../../store/searchQuery';
import { setHistory } from '../../store/historySlice';
import { useNavigate } from 'react-router';

const CollectionTag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collections = useSelector((store) => store?.collection?.collections);

  const handleTagQuery = (tag) => {
    const query = tag.title;
    dispatch(setImages([]));
    dispatch(setQuery(query));
    dispatch(setHistory(query));
    dispatch(setIsNewQuery(false));
    navigate(`/photos?query=${query}`);
  };

  return (
    <div className="w-full flex items-center justify-start gap-2 -my-1 mb-1 overflow-x-auto cursor-pointer">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="flex gap-2"
        >
          {collection?.tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center"
              onClick={() => handleTagQuery(tag)}
            >
              <span className="text-sm px-3 py-3 capitalize bg-black/50 text-zinc-200 rounded-md border-[1px] border-zinc-700">
                {tag.title}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CollectionTag;
