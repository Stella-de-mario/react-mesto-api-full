import { useState } from "react";

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({...errors, [name]: evt.target.validationMessage});
    setIsValid(evt.target.checkValidity())
  };

  function resetErrors() {
    setErrors({});
    setValues({});
    setIsValid(false);
  }
  return { values, handleChange, setValues, isValid, errors, resetErrors };
}