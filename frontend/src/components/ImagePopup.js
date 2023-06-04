import React from "react";

export function ImagePopup(props) {
  const {link, name} = props.card;

  return (
    <div className={`popup popup_type_picture ${props.isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container popup__container_type_picture">
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
        <img className="popup__picture" src={link} alt={`Место: ${name}`} />
        <p className="popup__picture-name">{name}</p>
      </div>
    </div>
  );
}