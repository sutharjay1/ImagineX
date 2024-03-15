import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

const Shimmer = () => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const query = useSelector((store) => store?.searchQuery?.query);

  useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart(0, 10);
    }
  }, [query, progress, setProgress, ref]);

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        ref={ref}
        onChange={(progress) => setProgress(progress)}
      />
    </div>
  );
};

export default Shimmer;
