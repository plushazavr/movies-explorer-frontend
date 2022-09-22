import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

export default function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <NavLink className="header__logo-link"  activeClassName="header__logo-link_active" exact to="/">
        <img className="header__logo" src={logo} alt="Лого"/>
      </NavLink>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  )
};
