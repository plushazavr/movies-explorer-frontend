import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";

export default function Profile(props) {
  return (
    <>
      <Header
        onOpenMenu={props.onOpenMenu}
      />
      <section className="profile">
        <form className="profile__form">
          <p className="profile__greeting">Привет, Екатерина!</p>
          <div className="profile__inputs">
            <label className="profile__label">
              <input className="profile__input" type="text" required/>
              <span className="profile__input-title">Имя</span>
            </label>
            <label className="profile__label">
              <input className="profile__input profile__input_type_error" type="text" required/>
              <span className="profile__input-title">E-mail</span>
            </label>
          </div>
          <div className="profile__edit-container profile__edit-container_enabled">
            <button className="profile__edit-button">Редактировать</button>
            <Link className="profile__link" to="/">Выйти из аккаунта</Link>
          </div>
          <div className="profile__save-container">
            <p className="profile__message profile__message_type_error">При обновлении профиля произошла ошибка.</p>
            <button className="profile__save-button">Сохранить</button>
          </div>
        </form>
      </section>
      <Menu
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
    </>
  )
}