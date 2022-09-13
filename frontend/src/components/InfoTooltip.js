import React from "react";
import registrationEr from "../image/registrationEr.svg";
import registrationOk from "../image/registrationOk.svg";

function InfoTooltip({ isPopupOpened, onClose, status }) {
  
    return (
        <div className={`popup ${isPopupOpened && 'popup_opened'}`}>
        <div className="popup__container popup__container_info">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть" 
            onClick={onClose}
          ></button>
          <img className="popup__registration-image" src={status ? registrationOk : registrationEr } alt="Статус регистрации" />
          <h2 className="popup__text popup__text_info">{status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
        </div>
      </div>
    )
}

export default InfoTooltip;


 


