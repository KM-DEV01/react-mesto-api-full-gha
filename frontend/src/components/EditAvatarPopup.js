import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function EditAvatarPopup(props) {

  const link = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: link.current.value
    });
  }

  React.useEffect(() => {
    link.current.value='';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input className="popup__input" type="url" name="avatar" id="avatarUrl" placeholder="Ссылка на картинку"
               required ref={link}/>
        <span className="avatarUrl-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}