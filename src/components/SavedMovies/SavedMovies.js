import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies(
  {
    isLoggedIn,
    onOpenMenu,
    savedMovies,
    handleGetSavedMovies,
    handleRemoveMovie,
    onSearch,
    onFilter,
    isLoading,
    globalError,
  }) {

  React.useEffect(() => {
    handleGetSavedMovies();
  }, []);

  const [ searchInput, setSearchInput ] = React.useState([]);
  const [ checkboxActivated, setCheckboxActivated ] = React.useState(false);
  const [ foundMovies, setFoundMovies ] = React.useState(savedMovies);
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);

  React.useEffect(() => {
    searchHandler();
    filterHandler();
  }, [checkboxActivated, searchInput, handleRemoveMovie]);

  function searchHandler() {
    setFoundMovies(onSearch(savedMovies, searchInput));
  }

  function filterHandler() {
    setFilteredMovies(onFilter(foundMovies));
  }

  return (
    <div className="saved-movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />

      <SearchForm
        isLoading={isLoading}
        setSearchInput={setSearchInput}
        setCheckboxActivated={setCheckboxActivated}
      />

      <MoviesCardList
        isSavedMoviesList={true}
        savedMovies={savedMovies}
        handleRemoveMovie={handleRemoveMovie}
        moviesList={checkboxActivated ? filteredMovies : foundMovies}
        globalError={globalError}
      />

      <Footer/>
    </div>
  )
}