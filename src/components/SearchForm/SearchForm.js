import React, { useEffect } from "react";
import { useState } from "react";
import './SearchForm.css';
import { filterDuration, filterMovies } from "../../utils/FilterMovies";

function SearchForm({
  setIsLoading,
  movies,
  setMovies,
  setIsNotMovies,
  pageSavedMovies,
  isChecked,
  setIsChecked,
  shownMovies,
  onSearch
}) {
  const handleToggle = () => {
    setIsChecked(!isChecked);
    checkboxActive(!isChecked)
  }

  const [isSearch, setIsSearch] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const lastMovieRequest = JSON.parse(localStorage.getItem("lastMoviesRequest"));

    if (pageSavedMovies) {
      setIsSearch('');

    } else {
      setIsSearch(lastMovieRequest)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (evt) => {
    setIsSearch(evt.target.value);
    setIsError(false)
  }

  const checkboxActive = (isChecked) => {
    setIsNotMovies(false)
    if (isChecked) {
      filterDuration(shownMovies).length === 0
        ? setIsNotMovies(true)
        : setMovies(filterDuration(shownMovies));
    } else {
      pageSavedMovies
        ? setMovies(movies)
        : filterMovies(movies, isSearch) === 0
          ? setIsNotMovies(true)
          : setMovies(filterMovies(movies, isSearch));
    }
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (!isSearch) {
      setIsError(true)
    } else {
      setIsLoading(true);
      onSearch(isSearch)
      setIsLoading(false)
    }
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <label className='search-form__input-container'>
          <input
            className="search-form__input"
            type="text"
            name="search"
            value={isSearch || ''}
            onChange={handleChange}
            placeholder="Фильм"
            required/>
          <button
            className='search-form__button'
            type="submit"
          />
          <span className='search__input-error'></span>
        </label>
        <label className="search-form__checkbox-label">
          <div className="search-form__checkbox-container">
            <input
              className="search-form__checkbox"
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span className="search-form__checkbox-slider" />
          </div>
          Короткометражки
        </label>
      </form>
    </section>
  );
};

export default SearchForm;