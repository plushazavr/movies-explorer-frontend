import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies(
  {}) {

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