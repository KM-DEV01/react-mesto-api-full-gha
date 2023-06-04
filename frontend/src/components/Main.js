import editButton from "../images/edit-button.svg";
import {Card} from "./Card";
import React from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__image" onClick={props.onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
              <img className="profile__avatar-edit" src={editButton} alt="Иконка редактировать"/>
            </div>
            <div className="profile__info">
              <div className="profile__main-info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-button button" type="button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__caption">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button button" type="button" onClick={props.onAddPlace}></button>
        </section>

        {/*карточки*/}
        <section className="card">
          <ul className="card__list">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}