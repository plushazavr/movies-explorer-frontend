import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import useWindowWidth from "../../utils/useWindowWidth";
import {
  WIDTH_FOR_3,
  WIDTH_FOR_2,
  MOVIES_TO_FIRST_RENDER_12,
  MOVIES_TO_FIRST_RENDER_8,
  MOVIES_TO_FIRST_RENDER_5,
  MOVIES_TO_NEXT_RENDER_3,
  MOVIES_TO_NEXT_RENDER_2,
} from '../../utils/constants';

export default function Movies(
  {
    isLoggedIn,
    onOpenMenu,
    allMovies,
    savedMovies,
    handleSaveMovie,
    handleRemoveMovie,
    onSearch,
    onFilter,
    isLoading,
    setIntoLocalStorage,
    getFromLocalStorage,
    globalError,
}) {
  const { width } = useWindowWidth();
  const [ searchInput, setSearchInput ] = React.useState([]);
  const [ checkboxActivated, setCheckboxActivated ] = React.useState(false);
  const [ foundMovies, setFoundMovies ] = React.useState([]);
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);

  const [ initialMovies, setInitialMovies ] = React.useState({ current: 0, next: 0 });
  const [ searchCompleted, setSearchCompleted ] = React.useState(false);


  React.useEffect(() => {
    checkLastSearch();
  }, []);

  React.useEffect(() => {
    searchHandler();
    filterHandler();
  }, [checkboxActivated, searchInput, searchCompleted]);

  React.useEffect(() => {
    resize();
  }, [width]);

  function resize() {
    if (width >= WIDTH_FOR_3) {
      setInitialMovies({ current: MOVIES_TO_FIRST_RENDER_12, next: MOVIES_TO_NEXT_RENDER_3 });
    } else if (width < WIDTH_FOR_2) {
      setInitialMovies({ current: MOVIES_TO_FIRST_RENDER_5, next: MOVIES_TO_NEXT_RENDER_2 });
    } else {
      setInitialMovies({ current: MOVIES_TO_FIRST_RENDER_8, next: MOVIES_TO_NEXT_RENDER_2 });
    }
  }

  function checkLastSearch() {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchInput(getFromLocalStorage('lastSearch'));
      setSearchCompleted(true);
    } else {
      setSearchCompleted(false);
    }
  }

  function searchHandler() {
    if (searchInput.length > 0) {
      setFoundMovies(onSearch(allMovies, searchInput));
      setIntoLocalStorage('lastSearch', searchInput);
      setSearchCompleted(true);
    }
  }

  function filterHandler() {
    setFilteredMovies(onFilter(foundMovies));
  }

  function moreButtonClickHandler() {
    setInitialMovies({current: initialMovies.current + initialMovies.next, next:initialMovies.next});
  }

  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />

      <SearchForm isLoading={isLoading}
        setSearchInput={setSearchInput}
        setCheckboxActivated={setCheckboxActivated}
      />

      <MoviesCardList
        isLoading={isLoading}
        isSavedMoviesList={false}
        savedMovies={savedMovies}
        moviesList={checkboxActivated ? filteredMovies : foundMovies}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
        renderLimit={initialMovies.current}
        moreButtonClickHandler={moreButtonClickHandler}
        searchCompleted={searchCompleted}
        globalError={globalError}
      />

      <Footer/>
    </div>
  )
}