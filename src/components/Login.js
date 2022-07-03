import React from "react";

export default function Login(props) {
  const [authData, setAuthData] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (evt) => {
    const {name, value} = evt.target;
    setAuthData({
      ...authData, [name]: value
    })
  }

  const handleFormSubmit = (evt) => {
  evt.preventDefault();
  props.handleLogin({email: authData.email, password: authData.password})
  }

    return (
    <div className="form form_login">
      <h2 className="form__title">Вход</h2>
      <form className="form__content" onSubmit={handleFormSubmit}>
        <input className="form__input" type="email" placeholder="Email" name="email" value={authData.email || ""} onChange={handleInputChange} required></input>
        <input className="form__input" type="password" placeholder="Пароль" name="password" value={authData.password || ""} onChange={handleInputChange} required></input>
        <button type="submit" aria-label="Войти" className="form__submit-button">Войти</button>
      </form>
    </div>
  );
}
