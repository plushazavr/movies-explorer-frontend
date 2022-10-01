/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../utils/useWindowWidth";
import { 
  WIDTH_SCREEN_DESKTOP,
  WIDTH_SCREEN_TABLET,
  WIDTH_SCREEN_MOBILE,
  QUANTITY_CARDS_DESKTOP,
  QUANTITY_CARDS_TABLET,
  QUANTITY_CARDS_MOBILE } from '../../utils/constants';

export default function MoviesCardList(
  {
    movies,
    onCardSaved,
    onCardDelete,
    pageSavedMovies,
    savedMovies,
    isSaveMovieIcon,
    setIsSaveMovieIcon
  }) {

  const size = useWindowSize();
  const [addCardsRow, setAddCardsRow] = useState(QUANTITY_CARDS_DESKTOP);
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  const checkWindow = () => {
    if (size.width >= WIDTH_SCREEN_DESKTOP) {
      setAddCardsRow(QUANTITY_CARDS_DESKTOP);
    } else if (size.width >= WIDTH_SCREEN_TABLET) {
      setAddCardsRow(QUANTITY_CARDS_TABLET);
    } else if (size.width >= WIDTH_SCREEN_MOBILE) {
      setAddCardsRow(QUANTITY_CARDS_MOBILE)
    }
  }

  useEffect(() => {
    checkWindow();
  }, [size.width])

  useEffect(() => {
    if (addCardsRow.total <= movies.length) {
      setIsButtonHidden(true);
    } else if (addCardsRow.total > movies.length) {
      setIsButtonHidden(false)
    }
  }, [movies.length, addCardsRow.total]);

  const addMoreCards = () => {
    setAddCardsRow({
      ...addCardsRow,
      total: addCardsRow.total + addCardsRow.plus,
    })
  }

  return (
      <section className="cards">
        <ul className="cards__list">
          {movies.slice(0, addCardsRow.total).map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              onCardSaved={onCardSaved}
              onCardDelete={onCardDelete}
              pageSavedMovies={pageSavedMovies}
              savedMovies={savedMovies}
              isSaveMovieIcon={isSaveMovieIcon}
              setIsSaveMovieIcon={setIsSaveMovieIcon}
            ></MoviesCard>
          ))}
        </ul>
        <div className="more">
          <button
            className="more__button"
            type="button"
            aria-label="показать ещё"
            hidden={!isButtonHidden || pageSavedMovies}
            onClick={addMoreCards}
          >Ещё</button>
        </div>
    </section>
  );
}