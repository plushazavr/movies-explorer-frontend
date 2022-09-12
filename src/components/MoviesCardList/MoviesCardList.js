import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_ERROR_MESSAGE } from '../../utils/constants';

export default function MoviesCardList(
  {
    isLoading,
    isSavedMoviesList,
    savedMovies,
    moviesList,
    handleSaveMovie ,
    handleRemoveMovie,
    renderLimit,
    moreButtonClickHandler,
    searchCompleted,
    globalError
  }) {

  return (
    <>
      <section className="cards">
        {
          isLoading ? (<Preloader/>) :
            globalError ? (<p className="cards__empty">{MOVIES_ERROR_MESSAGE}</p>) :
              moviesList.length ? (
                <ul className="cards__list">
                  {
                    moviesList.map((movie, index, array) => {
                      const limit = isSavedMoviesList ? array.length : renderLimit;
                      return (
                        index < limit &&
                        <MoviesCard
                          key={movie.movieId}
                          isSavedMoviesList={isSavedMoviesList}
                          savedMovies={savedMovies}
                          moviesList={moviesList}
                          movie={movie}
                          handleSaveMovie={handleSaveMovie}
                          handleRemoveMovie={handleRemoveMovie}
                        />
                      )
                    })
                  }
                </ul>
              ) : (
                <p className="cards__empty">
                  {
                    searchCompleted ?
                      "Ничего не найдено" : isSavedMoviesList ? "Здесь появятся ваши фильмы" : "Здесь отобразятся результаты поиска"
                  }
                </p>
              )
        }
      </section>

      {
        (!isSavedMoviesList && moviesList.length > renderLimit) &&
          (<div className="more">
            <button
              className="more__button"
              type="button"
              onClick={moreButtonClickHandler}
            >Ещё</button>
          </div>)
        }
    </>

  )
}