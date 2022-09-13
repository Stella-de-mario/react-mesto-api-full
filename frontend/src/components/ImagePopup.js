import React from "react";

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_preview-image ${card.link && "popup_opened"}`}>
        <div className="popup__container-image">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть" 
            onClick={onClose}
          ></button>
          <img className="popup__image" src={card.link} alt={card.title} />
          <h2 className="popup__image-text">{card.name}</h2>
        </div>
      </div>
    )
}

export default ImagePopup;