/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

export default function Movies({
  isLoggedIn,
  isLoading,
  setIsLoading,
  isNotMovies,
  setIsNotMovies,
  isChecked,
  setIsChecked,
  movies,
  setShownMovies,
  shownMovies,
  savedMovies,
  onCardDelete,
  onCardSaved,
  onSearch}) {

     useEffect(() => {
      const lastSearchedMovies = JSON.parse(localStorage.getItem("searchMovies"));
      const lastShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
      const lastCheckboxState = JSON.parse(localStorage.getItem('lastCheckboxState'));
       
      setIsNotMovies(false)
      setIsChecked(lastCheckboxState)
  
      if (lastSearchedMovies === null ?? lastShortMovies === null) {
        setShownMovies([])
      } else {
        if (lastCheckboxState === true) {
          
          if (lastShortMovies === null) {
            setIsNotMovies(true)
          } else {
            setIsNotMovies(false)
            setShownMovies(lastShortMovies)
          }
        } else {
          if (lastSearchedMovies.length === 0) {
            setIsNotMovies(true)
          } else {
            setIsNotMovies(false)
            setShownMovies(lastSearchedMovies)
          }
        }
      }
    }, []) 
    
    return (
    <div className="movies">
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
        onSearch={onSearch}
      />

      {isLoading 
        ?
          <Preloader /> : ''}
      {isNotMovies
        ? <p className="cards__empty">Ничего не найдено</p>
        : <MoviesCardList
          movies={shownMovies}
          setShownMovies={setShownMovies}
          onCardSaved={onCardSaved}
          onCardDelete={onCardDelete}
          savedMovies={savedMovies}
          />
      }
      <Footer/>
    </div>
  )
}