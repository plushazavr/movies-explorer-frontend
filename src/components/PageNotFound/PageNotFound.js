import React from 'react';
import './PageNotFound.css';
import { useHistory } from "react-router-dom";

export default function PageNotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <div className="page-not-found__group">
          <h1 className="page-not-found__title">404</h1>
          <p className="page-not-found__subtitle">Страница не найдена</p>
        </div>
        <button className="page-not-found__link" type="button" onClick={handleClick}>Назад</button>
      </div>
    </div>
  );
};
