import Header from './Components/Header/Header';
import Container from './Components/Container/Container';
import useGetImage from './Hooks/useGetImage.js';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from './store/searchQuery.js';
import { useRef } from 'react';
import useGetRandomImage from './Hooks/useGetRandomImage.js';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import SearchImageContainer from './Components/Container/SearchImageContainer.jsx';
import { FaArrowUp } from 'react-icons/fa6';

function App() {
  useGetImage();
  useGetRandomImage();

  const dispatch = useDispatch();

  const containerRef = useRef();

  const pageNumber = useSelector((store) => store?.searchQuery?.pageNumber);

  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      dispatch(setPageNumber(pageNumber + 1));
    }
  };

  const scrollToTop = (e) => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        style={{ height: `${window.innerHeight}px` }}
        className="w-full  flex-col items-center justify-center overflow-y-scroll"
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
          <FaArrowUp />
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
