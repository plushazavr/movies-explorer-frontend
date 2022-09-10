import React from 'react';
import './PageNotFound.css';
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <div className="page-not-found__group">
          <h1 className="page-not-found__title">404</h1>
          <p className="page-not-found__subtitle">Страница не найдена</p>
        </div>
        <Link className="page-not-found__link" to="/">Назад</Link>
      </div>
    </div>
  );
};