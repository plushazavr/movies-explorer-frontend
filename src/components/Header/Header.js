import React from 'react';
import { Link, NavLink } from "react-router-dom";

import './Header.css';
import logo from '../../images/logo.svg';

import Navigation from "../Navigation/Navigation";

export default function Header({ isLoggedIn, onOpenMenu }) {
  return (
    <header className="header">
      <NavLink className="header__logo-link"  activeClassName="header__logo-link_active" exact to="/">
        <img className="header__logo" src={logo} alt="Лого"/>
      </NavLink>
      {
        isLoggedIn ?
        (
          <>
            <div className="header__navigation">
              <Navigation/>
            </div>
            <button className="header__hamburger-button" onClick={onOpenMenu}/>
          </>
        ) : (
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
      }
    </header>
  )
};
