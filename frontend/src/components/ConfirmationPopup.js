import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({
  card,
  isPopupOpened,
  onClose,
  onCardDeleteClick,
 }) {
  
function handleSubmit(evt) {
    evt.preventDefault();
    onCardDeleteClick(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonText="Да"
      isPopupOpened={isPopupOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;
