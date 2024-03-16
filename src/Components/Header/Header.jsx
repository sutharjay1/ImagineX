import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsNewQuery,
  setIsSearching,
  setQuery,
} from '../../store/searchQuery';
import { setImages } from '../../store/imageSlice';
import { setHistory } from '../../store/historySlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import SearchBarTag from '../Container/SearchBarTag';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearching = useSelector((store) => store?.searchQuery?.isSearching);

  const images = useSelector((store) => store?.image?.images);

  const query = useSelector((store) => store?.searchQuery?.query);
  const isNewQuery = useSelector((store) => store?.searchQuery?.isNewQuery);
  const history = useSelector((store) => store?.history?.history);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tempQuery, setTempQuery] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    dispatch(setIsSearching(false));

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(setIsSearching(false));
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    dispatch(setHistory(tempQuery));
    dispatch(setIsNewQuery(true));
    dispatch(setIsSearching(false));
    navigate(`/photos?query=${tempQuery}`);

    setTimeout(() => {
      dispatch(setIsNewQuery(false));
    }, 1000);
  };

  const handleRecentSearch = () => {
    dispatch(setIsSearching(!isSearching));
  };

  const menuItems = [
    {
      name: 'Random',
      href: '/random',
    },
  ];

  return (
    <>
      <div className="relative w-full bg-black/20 backdrop-blur text-white p-2 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 lg:py-2 sm:px-6 sm:py-2 px-4 py-2 ">
          <div className="flex items-center justify-center gap-2">
            <Link to="/">
              <img
                className="w-[5rem] h-auto lg:w-[4rem] lg:h-auto md:w-[4rem] md:h-auto sm:w-[3rem] sm:h-auto"
                src="https://img.icons8.com/laces/ffffff/256/p.png"
                alt="p"
              />
            </Link>
            <span className="font-bold text-2xl lg:text-2xl lg:block md:block sm:block hidden">
              Pixio
            </span>
          </div>

          <div className="hidden lg:block md:block">
            <ul className="ml-12 inline-flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                >
                  <li
                    key={item.name}
                    className="inline-flex items-center text-sm font-semibold text-zinc-200 hover:text-zinc-500"
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="w-full relative flex justify-end lg:mx-auto sm:mx-3 mx-1">
            <form onSubmit={handleSearchQuery}>
              <input
                className="lg:w-[600px] sm:w-[400px] w-full max-w-xl h-10 flex sm:justify-center justify-center rounded-lg bg-black/90 pl-5 px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                type="text"
                placeholder="Search"
                value={tempQuery}
                onChange={(e) => setTempQuery(e.target.value)}
                onClick={handleRecentSearch}
              />
            </form>

            {isSearching && <SearchBarTag />}
          </div>

          <div className="ml-2 lg:hidden">
            <Menu
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute inset-x-0 top-0 z-[999] origin-top-right transform p-2 transition lg:hidden md:hidden sm:hidden"
            >
              <div className="divide-y-2 divide-zinc-50 rounded-lg bg-black/50 backdrop-blur-sm shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-end">
                    {/* <div className="inline-flex items-center space-x-2">
                      <span>jay</span>
                      <span className="font-bold">DevUI</span>
                    </div> */}
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-grey-50"
                        >
                          <span className="ml-3 text-base font-medium text-zinc-400">
                            {item.name}
                          </span>
                          <span>
                            <ChevronRight className="ml-3 h-4 w-4" />
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                  {/* <div className="ml-3 mt-4 flex items-center space-x-2">
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                      alt="Dan_Abromov"
                    />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">
                        Dan Abromov
                      </span>
                      <span className="text-sm font-medium text-zinc-500">
                        @dan_abromov
                      </span>
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
