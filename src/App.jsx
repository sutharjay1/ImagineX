import Header from './Components/Header/Header';
import Container from './Components/Container/Container';
import useGetImage from './Hooks/useGetImage.js';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from './store/searchQuery.js';
import { useRef } from 'react';
import useGetRandomImage from './Hooks/useGetRandomImage.js';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import SearchImageContainer from './Components/Container/SearchImageContainer.jsx';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import useGetCollections from './Hooks/useGetCollections.js';

function App() {
  useGetImage();
  useGetRandomImage();
  useGetCollections();

  const dispatch = useDispatch();

  const containerRef = useRef();

  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);

  const handleScroll = (e) => {
    const target = e.target;
    const threshold = 1;

    if (
      target.scrollTop + target.clientHeight >=
      target.scrollHeight - threshold
    ) {
      dispatch(setPageNumber(pageNumber + 1));
    }
  };

  const scrollToTop = (e) => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = (e) => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        style={{ height: `${window.innerHeight}px` }}
        className="w-full h-screen flex-col items-center justify-center overflow-y-scroll"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <RouterProvider router={appRouter}>
          <Outlet />
        </RouterProvider>

        <button
          className="absolute bottom-0 right-0 mx-5 my-6"
          onClick={scrollToTop}
        >
          <IoIosArrowUp />
        </button>

        <button
          className="absolute bottom-0 left-0 mx-5 my-6"
          onClick={scrollToBottom}
        >
          <IoIosArrowDown />
        </button>
      </div>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
  },
  {
    path: '/photos',
    element: <SearchImageContainer />,
  },
  {
    path: '/random',
    element: <Container />,
  },
]);

export default App;
