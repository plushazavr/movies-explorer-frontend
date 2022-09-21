import React, { useState } from 'react';
import './MoviesCard.css';
import CardButton from "../CardButton/CardButton";

export default function MoviesCard({
  movie,
  onCardSaved,
  onCardDelete,
  pageSavedMovies,
  savedMovies
  }) {
    const baseURL = 'https://api.nomoreparties.co';

    const [isButtonHidden, setIsButtonHidden] = useState(true);
  
    const isSaved = movie.id && savedMovies.some(el => el.movieId === movie.id);
  
    const showButton = () => {
      setIsButtonHidden(false)
    }
  
    const hideButton = () => {
      setIsButtonHidden(true)
    }
  
    function getTime(duration) {
      const hours = Math.trunc(duration / 60);
      const min = duration % 60;
      return hours + 'ч ' + min + 'м';
    }

    return (
    <li className="card" onMouseOver={showButton}
    onMouseOut={hideButton}>
      <figure className="card__container">
        <figcaption className="card__caption">
          <p className="card__name">{movie.nameRU}</p>
          <p className="card__duration">{getTime(movie.duration)}</p>
        </figcaption>
        <CardButton
            movie={movie}
            onCardSaved={onCardSaved}
            onCardDelete={onCardDelete}
            isSaved={isSaved}
            pageSavedMovies={pageSavedMovies}
            savedMovies={savedMovies}
            isButtonHidden={isButtonHidden}
          />
      </figure>
      <a className="card__link"
            href={movie.trailerLink}
            rel="noreferrer"
            target="_blank">
        <img className="card__image" src={movie.image.url ? `${baseURL}/${movie.image.url}` : movie.image}
            alt={movie.nameRU}/>
      </a>
    </li>
  )
}