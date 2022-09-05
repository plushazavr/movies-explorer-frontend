import React from 'react';
import { Link, NavLink } from "react-router-dom";

import './Navigation.css';

export default function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__element">
          <ul className="movies-navigation">
            <li className="movies-navigation__element movies-navigation__element_place_menu">
              <Link
                className="movies-navigation__link"
                onClick={props.onClose}
                to="/">Главная
              </Link>
            </li>
            <li className="movies-navigation__element">
              <NavLink
                className="movies-navigation__link"
                activeClassName="movies-navigation__link_active"
                onClick={props.onClose}
                to="/movies">Фильмы
              </NavLink>
            </li>
            <li className="movies-navigation__element">
              <NavLink
                className="movies-navigation__link"
                activeClassName="movies-navigation__link_active"
                onClick={props.onClose}
                to="/saved-movies">Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="navigation__element">
          <NavLink
            className="navigation__profile-button"
            activeClassName="navigation__profile-button_active"
            onClick={props.onClose}
            to="/profile">
              Аккаунт
            <button className="navigation__profile-icon"/>
          </NavLink>
        </li>
      </ul>
    </nav>


  )
};