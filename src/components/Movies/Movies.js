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

export default function Movies( {}) {
  return (
    <div className="movies">
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