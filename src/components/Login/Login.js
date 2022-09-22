import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from "../../utils/ReactValidation";

export default function Login(props) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin(values.email, values.password);
  }

  return (
    <>
      <div className="login">
        <div className="login__container">
          <Link className="login__logo-link" to="/">
            <img className="login__logo" src={logo} alt="Лого"/>
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form
            className="login__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="login__input-container">
              <label className="login__label">
                <span className="login__input-title">E-mail</span>
                <input
                  className={`login__input ${errors.email && 'login__input_type_error'}`}
                  type="email"
                  name="email"
                  value={values.email || ''}
                  onChange={handleChange}
                  disabled={props.isDisabledInput}
                  required
                  pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                />
                <span className={`login__input-error ${errors.email && 'login__input-error_visible'}`}>{errors.email}</span>
              </label>
              <label className="login__label">
                <span className="login__input-title">Пароль</span>
                <input
                  className={`login__input ${errors.password && 'login__input_type_error'}`}
                  type="password"
                  name="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={props.isDisabledInput}
                  required
                />
                <span className={`login__input-error ${errors.password && 'login__input-error_visible'}`}>{errors.password}</span>
              </label>
            </div>
            <div className="login__button-container">
              <p
                className={`login__message ${props.errorMessage && 'login__message_type_error'}`}>{props.errorMessage}
              </p>
              <button
                className={`login__button ${!isValid && 'login__button_disabled'}`}
                type="submit"
                disabled={!isValid || props.isDisabledButton}>Войти</button>
              <p className="login__question">Ещё не зарегистрированы?
                <Link className="login__link" to="/signup">Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};