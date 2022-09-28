import { useForm } from '../hooks/useForm.js';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid, resetErrors } = useForm({});
    
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({...values})
    resetErrors();
  }
  
  return (
    <form  
      className="form"
      onSubmit={handleSubmit}
    >
      <h3 className="form__title">Вход</h3>
       <input
       className={`login__input ${errors.email && 'login__input_invalid'}`}
        id="login-email"
        type="email"
        name="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
        value={values.email || ''}
        onChange={handleChange}
      />
      <span
       className="login__error login__error_upper"
       id="login-email-error">
        {!isValid && errors.email}
      </span>    
      <input
        className={`login__input ${errors.password && 'login__input_invalid'}`} 
        id="login-password"
        type="password"
        name="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="20"
        required
        value={values.password || ''}
        onChange={handleChange}
      />
      <span 
        className="login__error login__error_low"
         id="login-password-error">
        {!isValid && errors.password}
      </span>
      <button 
        type="submit" 
        className="login__button"
      >
        Войти   
      </button>
    </form> 
  );
}
  
export default Login;