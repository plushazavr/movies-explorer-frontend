import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';

export default function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Link className="login__logo-link" exact to="/">
          <img className="login__logo" src={logo} alt="Лого"/>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" action="">
          <div className="login__input-container">
            <label className="login__label">
              <span className="login__input-title">E-mail</span>
              <input className="login__input" type="email" required/>
              <span className="login__input-error">Что-то пошло не так...</span>
            </label>
            <label className="login__label">
              <span className="login__input-title">Пароль</span>
              <input className="login__input login__input_type_error" type="password" required/>
              <span className="login__input-error login__input-error_visible login__input-error_last-of-type">Что-то пошло не так...</span>
            </label>
          </div>
          <div className="login__button-container">
            <button className="login__button">Войти</button>
            <p className="login__question">Ещё не зарегистрированы?
              <Link className="login__link" to="/signup">Регистрация</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};