import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [regData, setRegData] = React.useState({
    email: "",
    password: ""
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setRegData({
      ...regData, [name]: value
    })
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegister({ email: regData.email, password: regData.password });
  };

  return (
    <div className="form form_register">
      <h2 className="form__title">Регистрация</h2>
      <form className="form__content" onSubmit={handleFormSubmit}>
        <input className="form__input" type="email" placeholder="Email" name="email" value={regData.email} onChange={handleInputChange} required></input>
        <input className="form__input" type="password" placeholder="Пароль" name="password" value={regData.password} onChange={handleInputChange} required ></input>
        <button type="submit" aria-label="Зарегистрироваться" className="form__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" style={{ textDecoration: 'none' }}>
        <p className="form__link">Уже зарегистрированы? Войти</p>
      </Link>
    </div>
  )
}
