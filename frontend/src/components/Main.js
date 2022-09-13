import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsContainer = cards.map((card) => {
    return (
      <Card
        card={card}
        src={card.link}
        title={card.title}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        key={card._id}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <a className="profile__avatar" onClick={onEditAvatar}>
            <img
              href="#"
              src={currentUser.avatar}
              alt="Фотография пользователя"
              name="avatar"
              className="profile__image"
            />
          </a>
          <div className="profile__title">
            <h1 className="profile__name" name="name">
              {currentUser.name}
            </h1>

            <button
              type="button"
              onClick={onEditProfile}
              className="profile__edit-button"
              aria-label="Изменить"
            ></button>

            <p className="profile__profession" name="about">
              {currentUser.about}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="places">
        <ul className="places__list">{cardsContainer}</ul>
      </section>
    </main>
  );
}

export default Main;