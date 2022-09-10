import React from 'react';
import './Profile.css';
import Header from "../Header/Header";
import {useFormWithValidation} from "../../utils/ReactValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import GlobalPreloader from "../GlobalPreloader/GlobalPreloader";

export default function Profile({
  isLoggedIn,
  onLogout,
  onOpenMenu,
  onUpdate,
  isLoading,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage
}) {
  const formWithValidation = useFormWithValidation();
  const { name, email } = formWithValidation.values;
  const { values, setValues, handleChange, errors, isValid } = formWithValidation;
  const [ isEdited, setIsEdited ] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  let isChanged = (currentUser.name !== values.name) || (currentUser.email !== values.email);

  React.useEffect(() => {
    setValues(currentUser);
    setSuccessMessage(false);
    setErrorMessage(false);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdate({ name, email });
    setIsEdited(false);
  }

  function handleEditClick() {
    setIsEdited(true);
    setSuccessMessage(false);
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />
      <section className="profile">
        <form className="profile__form"
          onSubmit={handleSubmit}
          noValidate>
          <p className="profile__greeting">{`Привет, ${currentUser.name}!`}</p>
          <div className="profile__inputs">
            <label className="profile__label">
              <input className={`profile__input ${errors.name && 'profile__input_type_error'}`}
                type="text"
                name="name"
                minLength="2"
                maxLength="30"
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isEdited || isLoading}
                required/>
              <span className="profile__input-title">Имя</span>
              <span className={`profile__input-error ${errors.name && 'profile__input-error_visible'}`}>{errors.name}</span>
            </label>
            <label className="profile__label">
              <input cclassName={`profile__input ${errors.email && 'profile__input_type_error'}`}
                type="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isEdited || isLoading}
                required/>
              <span className="profile__input-title">E-mail</span>
              <span className={`profile__input-error ${errors.email && 'profile__input-error_visible'}`}>{errors.email}</span>
            </label>
            <p className={`profile__message ${successMessage &&'profile__message_type_success'}`}>Данные успешно обновлены!</p>
          </div>
          <div className={`profile__edit-container ${!isEdited && 'profile__edit-container_enabled'}`}>
            <button className="profile__edit-button" type="button" onClick={handleEditClick}>Редактировать</button>
            <button className="profile__quit-button" type="button" onClick={onLogout}>Выйти из аккаунта</button>
          </div>
          <div className={`profile__save-container ${isEdited && 'profile__save-container_enabled'}`}>
            <p className={`profile__message ${errorMessage && 'profile__message_type_error'}`}>{errorMessage}</p>
            <button
              className={`profile__save-button ${(!isValid || !isChanged) && 'profile__save-button_disabled'}`}
              type="submit"
              disabled={!isValid || isLoading || !isChanged}>Сохранить
            </button>
          </div>
        </form>
      </section>
      <GlobalPreloader isLoading={isLoading} />
    </>
  )
}