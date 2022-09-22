import React, { useEffect } from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies(
  {isLoggedIn,
    isLoading,
    setIsLoading,
    isNotMovies,
    setIsNotMovies,
    isChecked,
    setIsChecked,
    movies,
    setShownMovies,
    shownMovies,
    onCardDelete,
    onSearch}) {

  const pageSavedMovies = true;

  useEffect(() => {
    setIsNotMovies(false)
    setIsChecked(false)
    setShownMovies(movies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="saved-movies">
      <Header
          isLoggedIn={isLoggedIn}
        />      
          <SearchForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            movies={movies}
            shownMovies={shownMovies}
            setMovies={setShownMovies}
            setIsNotMovies={setIsNotMovies}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            pageSavedMovies={pageSavedMovies}
            onSearch={onSearch}
          />
          {isLoading
            ? <Preloader /> : ''}
          {isNotMovies
            ? <p className="cards__empty">Ничего не найдено</p>
            : <MoviesCardList
              movies={shownMovies}
              setShownMovies={setShownMovies}
              onCardDelete={onCardDelete}
              pageSavedMovies={pageSavedMovies}
            />
          }      
        <Footer />
      </div>      
    </>
  )
}