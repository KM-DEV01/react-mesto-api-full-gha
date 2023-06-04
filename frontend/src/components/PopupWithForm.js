import React from "react";

export function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : null }`}>
      <div className="popup__container">
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__save-button" type="submit">{props.submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}