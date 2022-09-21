import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import './CardButton.css';

function CardButton({
  onCardSaved,
  movie,
  onCardDelete,
  isSaved,
  pageSavedMovies,
  savedMovies,
}) {

  const [isSaveMovieIcon, setIsSaveMovieIcon] = useState(false);

  const currentMovie = movie.id && savedMovies.filter(el => el.movieId === movie.id)

  useEffect(() => {
    if (isSaved) {
      setIsSaveMovieIcon(true)
    } else {
      setIsSaveMovieIcon(false)
    }
  }, [isSaved])

  const handleMovieDelete = () => {
    if (pageSavedMovies) {
      onCardDelete(movie._id)
    } else {
      onCardDelete(currentMovie[0]._id)
    }

    isSaved
      ? setIsSaveMovieIcon(false)
      : setIsSaveMovieIcon(true)
  }

  const handleMovieSave = () => {
    onCardSaved(movie)
    isSaved
      ? setIsSaveMovieIcon(true)
      : setIsSaveMovieIcon(false)
  }

  return (
    <>
      <Switch>
        <Route path="/movies">
          {isSaveMovieIcon
          ?
            <button className="card__button card__button_saved"
               onClick={handleMovieSave}
            ></button>

            : 
              <button
                type="button"
                className="card__button card__button_type_save"
                aria-label="сохранить"
                onClick={handleMovieSave}
              >
              </button>
          }
        </Route>

        <Route path="/saved-movies">          
          <button
                type="button"
                className="card__button card__button_type_remove"
                aria-label="удалить фильм"
                onClick={handleMovieDelete}
              >
          </button>
        </Route>
      </Switch>
    </>
  )
}

export default CardButton
