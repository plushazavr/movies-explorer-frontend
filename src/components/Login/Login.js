import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from "../../utils/ReactValidation";
import GlobalPreloader from "../GlobalPreloader/GlobalPreloader";

export default function Login({ onLogin, isLoading, errorMessage }) {
  const formWithValidation = useFormWithValidation();
  const { email, password } = formWithValidation.values;
  const { values, handleChange, errors, isValid, resetForm } = formWithValidation;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
  }
  return (
    <>
      <div className="login">
      <div className="login__container">
        <Link className="login__logo-link" exact to="/">
          <img className="login__logo" src={logo} alt="Лого"/>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form"
            onSubmit={handleSubmit}
            noValidate>
          <div className="login__input-container">
            <label className="login__label">
              <span className="login__input-title">E-mail</span>
              <input className={`login__input ${errors.email && 'login__input_type_error'}`}
                  type="email"
                  name="email"
                  value={values.email || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  required/>
              <span className={`login__input-error ${errors.email && 'login__input-error_visible'}`}>{errors.email}</span>
            </label>
            <label className="login__label">
              <span className="login__input-title">Пароль</span>
              <input className={`login__input ${errors.password && 'login__input_type_error'}`}
                  type="password"
                  name="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  required/>
              <span lassName={`login__input-error ${errors.password && 'login__input-error_visible'}`}>{errors.password}</span>
            </label>
          </div>
          <div className="login__button-container">
            <button className={`login__button ${!isValid && 'login__button_disabled'}`}
                type="submit"
                disabled={!isValid || isLoading}>Войти</button>
            <p className="login__question">Ещё не зарегистрированы?
              <Link className="login__link" to="/signup">Регистрация</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    <GlobalPreloader isLoading={isLoading} />
  </>    
  );
};