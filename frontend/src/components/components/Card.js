import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_inactive"
  }`;

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `card__heart ${
    isLiked ? "card__heart_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
        aria-label="Удалить"
      ></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.title}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__heart-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
          <p className="card__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;