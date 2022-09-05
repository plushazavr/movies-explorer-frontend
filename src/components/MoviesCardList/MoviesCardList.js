import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <section className="cards">
      <p className="cards__empty">Список пуст</p>
      <ul className="cards__list">
        <MoviesCard isSaved={true} isSavedMoviesList={props.isSavedMoviesList}/>
        <MoviesCard isSaved={false} isSavedMoviesList={props.isSavedMoviesList}/>
        <MoviesCard isSaved={true} isSavedMoviesList={props.isSavedMoviesList}/>
        <MoviesCard isSaved={false} isSavedMoviesList={props.isSavedMoviesList}/>
        <MoviesCard isSaved={true} isSavedMoviesList={props.isSavedMoviesList}/>
        <MoviesCard isSaved={true} isSavedMoviesList={props.isSavedMoviesList}/>
      </ul>
    </section>
  )
}