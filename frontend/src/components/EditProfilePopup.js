import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useForm } from "../hooks/useForm.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup ({isPopupOpened, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about})
  }, [currentUser, isPopupOpened, setValues]); 

 function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
       name: values.name,
       about: values.about,
    })
 };
  
  return (
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    buttonText="Сохранить"
    onClose={onClose}
    isPopupOpened={`${isPopupOpened ? "popup_opened" : ""}`}
    onSubmit={handleSubmit}
  >
    <input
      type="text"
      className="popup__input popup__input-name"
      name="name"
      minLength="2"
      maxLength="40"
      id="profile-name"
      value={values.name || ''}
      onChange={handleChange}
      required
      placeholder="Имя"
    />
    <span className="popup__error" id="profile-name-error" />
    <input
      type="text"
      className="popup__input popup__input-profession"
      name="about"
      minLength="2"
      maxLength="200"
      id="profile-profession"
      value={values.about || ''}
      onChange={handleChange}
      required
      placeholder="Профессия"
    />
    <span className="popup__error" id="profile-profession-error" />
  </PopupWithForm>
  )
}

export default EditProfilePopup;