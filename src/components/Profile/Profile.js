import React, { createRef, useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from "../Header/Header";
import {useFormWithValidation} from "../../utils/ReactValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile(props) {
  const nameInput = createRef();
  const currentUser = useContext(CurrentUserContext)
  const { values, setValues, errors, isValid, handleChange } = useFormWithValidation();

  const [isActive, setIsActive] = useState(false);
  const [inputActive, setInputActive] = useState(false);


  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  function editProfile() {
    props.setIsErrorMessage('')
    setIsActive(true);
    setInputActive(true);
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name: values.name,
      email: values.email
    });
    setIsActive(false);
  }

  const handleToggle = () => {
    setInputActive(false);
  }

  return (
    <>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <main className="profile">
        <form className="profile__form" name="profile" onSubmit={handleFormSubmit}>
        <p className="profile__greeting">{`Привет, ${currentUser.name}!`}</p>
          <div className="profile__inputs">
            <label className="profile__label">
              <input
                className={`profile__input ${errors.name && 'profile__input_type_error'}`}
                type="name"
                name="name"
                minLength="2"
                maxLength="30"
                ref={nameInput}
                disabled={!inputActive || props.isDisabledInput}
                onChange={handleChange}
                value={values.name || ''}
                required
              />
              <span className="profile__input-title">Имя</span>
              <span className='profile__input-error'>{errors.name}</span>
            </label>


            <label className="profile__label">
              <input
                className='profile__input'
                type="email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
                disabled={!inputActive || props.isDisabledInput}
                onChange={handleChange}
                value={values.email || ''}
                required
              />
              <span className="profile__input-title">E-mail</span>
              <span className='profile__input-error'>{errors.email}</span>
            </label>
          </div>

          <span className="error-message">{props.isErrorMessage}</span>


          <div className='profile__edit-container_enabled'>
            <button className="profile__edit-button" type="button" onClick={editProfile}>Редактировать</button>

            <button className="profile__quit-button" type="button" onClick={props.OnSignOut}>Выйти из аккаунта</button>
          </div>
          <div className='profile__save-container_enabled'>
            <p className={`profile__message ${props.errorMessage && 'profile__message_type_error'}`}>{props.errorMessage}</p>
            <button
              type="submit"
              className={`profile__save-button ${!isActive ? `profile__save-button_hidden` : ``} profile__save-button`}
              disabled={!isValid || props.isDisabledButton || (currentUser.name === values.name && currentUser.email === values.email)}
              onClick={handleToggle}
            >Сохранить</button>
          </div>
        </form>
      </main>
    </>
  );
}