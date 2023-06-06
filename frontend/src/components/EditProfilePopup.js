import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    console.log(currentUser)
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input"
          type="text"
          name="about"
          id="caption"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="caption-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}