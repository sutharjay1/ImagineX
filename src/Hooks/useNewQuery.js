import React from 'react';
import { useSelector } from 'react-redux';

const useNewQuery = () => {
  const query = useSelector((store) => store?.searchQuery?.query);

  const isNewQuery = (query) => {};
};

export default useNewQuery;
