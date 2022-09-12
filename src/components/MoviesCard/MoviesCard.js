import React from 'react';
import './MoviesCard.css';
import { durationConverter } from '../../utils/durationConverter';

export default function MoviesCard({
    isSavedMoviesList,
    savedMovies, movie,
    handleSaveMovie,
    handleRemoveMovie,
  }) {
  const { image, nameRU, duration, trailerLink } = movie;

  let isSaved = false;
  let savedId;
  isSaved = savedMovies.some((item) => {
    if (item.movieId === movie.movieId) {
      savedId = item._id;
      return true;
    }
    return false;
  });

  const cardButtonClassName = (`card__button ${isSavedMoviesList ? 'card__button_type_remove' : isSaved ? 'card__button_saved' : 'card__button_type_save' }`);

  return (
    <li className="card">
      <figure className="card__container">
        <figcaption className="card__caption">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{durationConverter(duration)}</p>
        </figcaption>
        <button
          className={cardButtonClassName} onClick={() => {
            isSaved ? handleRemoveMovie(movie._id ? movie._id  : savedId) : handleSaveMovie(movie)
          }}>
        </button>
        
        
        
      </figure>
      <a className="card__link"
            href={trailerLink}
            rel="noreferrer"
            target="_blank">
          <img className="card__image" src={image} alt={nameRU}/>
        </a>
    </li>
  )
}