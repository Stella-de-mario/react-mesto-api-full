import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isPopupOpened, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  useEffect(() => {
    if (isPopupOpened) {
      console.log(avatarRef.current);
      avatarRef.current.value = "";
    }
  }, [isPopupOpened]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      isPopupOpened={`${isPopupOpened ? "popup_opened" : ""}`}
    >
      <input
        required
        className="popup__input"
        ref={avatarRef}
        type="url"
        id="avatar-link"
        name="avatar"
        placeholder="Ссылка на новый аватар"
      />
      <span className="popup__error" id="avatar-link-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;