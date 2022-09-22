import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import './Navigation.css';

export default function Navigation(isLoggedIn) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setIsOpenMenu(true)
  }
  const handleCloseMenu = () => {
    setIsOpenMenu(false)
  }
  return (
    <>
      <nav className="navigation">
        {!isLoggedIn
          ? (
            <ul className="header__auth-list">
                <li className="header__auth-element">
                  <Link className="header__sing-up-link" to="/signup">
                    Регистрация
                  </Link>
                </li>
                <li className="header__auth-element">
                  <Link className="header__sign-in-button" to="/signin">
                    Войти
                  </Link>
                </li>
              </ul>
          )
          : (
            <>
              <div className="header__navigation">
                <ul className="navigation__list">
                  <li className="navigation__element">
                    <ul className="movies-navigation">
                      <li className="movies-navigation__element">
                        <NavLink
                          className="movies-navigation__link"
                          activeClassName="movies-navigation__link_active"
                          onClick={handleCloseMenu}
                          to="/movies">Фильмы
                        </NavLink>
                      </li>
                      <li className="movies-navigation__element">
                        <NavLink
                          className="movies-navigation__link"
                          activeClassName="movies-navigation__link_active"
                          onClick={handleCloseMenu}
                          to="/saved-movies">Сохранённые фильмы
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="navigation__element">
                    <NavLink
                        className="navigation__profile-button"
                        activeClassName="navigation__profile-button_active"
                        onClick={handleCloseMenu}
                        to="/profile">
                          Аккаунт
                        <button className="navigation__profile-icon"/>
                      </NavLink>
                  </li>
                </ul>
              </div>
              <button className="header__hamburger-button" onClick={handleOpenMenu}/>
            </>
          )
        }
      </nav>
      <section className={`menu ${isOpenMenu ? `menu_opened` : ` `}`}>
        <div className="menu__container">
          <button
            type="button"
            className="menu__close-button"
            aria-label="закрыть окно"
            onClick={handleCloseMenu}>
          </button>
          <ul className="navigation__list">
            <li className="navigation__element">
              <ul className="movies-navigation">
                <li className="movies-navigation__element movies-navigation__element_place_menu">
                  <Link
                    className="movies-navigation__link"
                    onClick={handleCloseMenu}
                    to="/">Главная
                  </Link>
                </li>
                <li className="movies-navigation__element">
                  <NavLink
                    className="movies-navigation__link"
                    activeClassName="movies-navigation__link_active"
                    onClick={handleCloseMenu}
                    to="/movies">Фильмы
                  </NavLink>
                </li>
                <li className="movies-navigation__element">
                  <NavLink
                    className="movies-navigation__link"
                    activeClassName="movies-navigation__link_active"
                    onClick={handleCloseMenu}
                    to="/saved-movies">Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="navigation__element">
            <NavLink
                className="navigation__profile-button"
                activeClassName="navigation__profile-button_active"
                onClick={handleCloseMenu}
                to="/profile">
                  Аккаунт
                <button className="navigation__profile-icon"/>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
  };