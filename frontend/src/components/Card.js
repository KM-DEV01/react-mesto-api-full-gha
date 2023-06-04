import React from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function Card (props) {

  const {link, name, likes} = props.card
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card__item">
      { isOwn && <button type="button" className="card__delete-button" onClick={handleDeleteClick}/>}
      <img className="card__image" src={link} alt={`Место: ${name}`} onClick={handleClick}/>
      <div className="card__container">
        <h3 className="card__name">{name}</h3>
        <div className="card__like-container">
          <button type="button" className={`card__like-button ${isLiked && 'card__like-button_active'}`}
                  onClick={handleLikeClick} />
          <span className="card__likes">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}