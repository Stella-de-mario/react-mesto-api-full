import React from "react";

function PopupWithForm({ name, title, children, buttonText, isPopupOpened, onClose, onSubmit, isDisabled }) {
  
  return (
    <div className={`popup popup__input_${name} ${isPopupOpened && 'popup_opened'}`}>
    <div className="popup__container">
      <button
        type="button"
        className="popup__close-button" 
        onClick={onClose}
        aria-label="Закрыть"
      />
      <h2 className="popup__title">{title}</h2>
      <form 
      className="popup__form" 
      name={name}
      onSubmit={onSubmit} 
      noValidate>
      {children}
      <button 
      className="popup__save-button" 
      type="submit"
      >{buttonText}
      </button>
     </form>
    </div>
  </div>
  )
}

export default PopupWithForm;