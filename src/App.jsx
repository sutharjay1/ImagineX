import Header from './Components/Header/Header';
import Container from './Components/Container/Container';
import useGetImage from './Hooks/useGetImage.js';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from './store/searchQuery.js';
import { useRef } from 'react';
import useGetRandomImage from './Hooks/useGetRandomImage.js';

function App() {
  useGetImage();
  useGetRandomImage();

  const dispatch = useDispatch();
  const containerRef = useRef();

  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight ===
      container.scrollHeight
    ) {
      dispatch(setPageNumber(pageNumber + 1));
    }
  };

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        style={{ height: `${window.innerHeight}px` }}
        className="w-full flex-col items-center justify-center overflow-y-scroll"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <Header />

        <Container />
        <button
          className="absolute bottom-0 right-0"
          onClick={scrollToTop}
        >
          Scroll to top
        </button>
      </div>
    </>
  );
}

export default App;
