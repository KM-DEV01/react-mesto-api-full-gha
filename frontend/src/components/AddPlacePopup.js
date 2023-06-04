import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setName(e.target.value)
  }

  function handlePlaceLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input"
          name="name"
          id="image-name"
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handlePlaceNameChange}
        />
        <span className="image-name-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          className="popup__input"
          name="link"
          id="url"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handlePlaceLinkChange}
        />
        <span className="url-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}