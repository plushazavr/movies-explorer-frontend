import React from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/ReactValidation';
import GlobalPreloader from "../GlobalPreloader/GlobalPreloader";

export default function Register({ onRegister, isLoading, errorMessage }) {
  const formWithValidation = useFormWithValidation();
  const { name, email, password } = formWithValidation.values;
  const { values, handleChange, errors, isValid, resetForm } = formWithValidation;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <>
      <div className="register">
        <div className="register__container">
          <Link className="register__logo-link" to="/">
            <img className="register__logo" src={logo} alt="Лого"/>
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form
            className="register__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="register__input-container">
              <label className="register__label">
                <span className="register__input-title">Имя</span>
                <input
                  className={`register__input ${errors.name && 'register__input_type_error'}`}
                  type="text"
                  name="name"
                  minLength="2"
                  maxLength="30"
                  value={values.name || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className={`register__input-error ${errors.name && 'register__input-error_visible'}`}>{errors.name}</span>
              </label>
              <label className="register__label">
                <span className="register__input-title">E-mail</span>
                <input
                  className={`register__input ${errors.email && 'register__input_type_error'}`}
                  type="email"
                  name="email"
                  value={values.email || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className={`register__input-error ${errors.email && 'register__input-error_visible'}`}>{errors.email}</span>
              </label>
              <label className="register__label">
                <span className="register__input-title">Пароль</span>
                <input
                  className={`register__input ${errors.password && 'register__input_type_error'}`}
                  type="password"
                  name="password"
                  minLength="8"
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className={`register__input-error ${errors.password && 'register__input-error_visible'}`}>{errors.password}</span>
              </label>
            </div>
            <div className="register__button-container">
              <p
                className={`register__message ${errorMessage && 'register__message_type_error'}`}>{errorMessage}
              </p>
              <button
                className={`register__button ${!isValid && 'register__button_disabled'}`}
                type="submit"
                disabled={!isValid || isLoading}>Зарегистрироваться
              </button>
              <p className="register__question">Уже зарегистрированы?
                <Link className="register__link" to="/signin">Войти</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <GlobalPreloader isLoading={isLoading} />
    </>
  );
};
