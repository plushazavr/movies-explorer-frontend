import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <label className="search-form__input-container">
          <input className="search-form__input" type="text" placeholder="Фильм" required/>
          <button className="search-form__button" />
        </label>
        <label className="search-form__checkbox-label">
          <div className="search-form__checkbox-container">
            <input className="search-form__checkbox" type="checkbox"/>
            <span className="search-form__checkbox-slider" />
          </div>
          Короткометражки
          {/*<p className="search-form__checkbox-title">Короткометражки</p>*/}
        </label>
      </form>
    </section>
  );
};