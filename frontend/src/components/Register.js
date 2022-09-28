import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ onRegister }) {
    const {values, handleChange, errors, isValid, resetErrors} = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({...values});
    resetErrors();
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <h3 className="form__title">Регистрация</h3>
      <input
        className="login__input"
        type="email"
        name="email"
        id="profile-email"
        value={values.email || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
        placeholder="Email"
      />
       <span 
       className="login__error login__error_upper" 
       id="profile-email-error">{!isValid && errors.email}
       </span>
      <input
        className="login__input"
        type="password"
        name="password"
        id="profile-password"
        value={values.password || ""}
        onChange={handleChange}
        minLength="6"
        maxLength="20"
        required
        placeholder="Пароль"
      />
      <span 
        className="login__error login__error_low" 
        id="profile-password-error">{!isValid && errors.password}
        </span>
      <button 
        type="submit" 
        className="login__button"
      >
        Зарегистрироваться   
      </button>
      <p className="register__signin">
        Уже зарегистрированы?
        <Link className="register__link" to="/sign-in"> Войти</Link>
      </p>
    </form> 
  )
}

export default Register;