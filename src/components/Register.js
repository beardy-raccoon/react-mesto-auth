import { Link } from "react-router-dom";

export default function Register() {

  const handleClick = (evt) => evt.preventDefault();

  return (
    <div className="form form_register">
    <h2 className="form__title">Регистрация</h2>
    <form className="form__content">
      <input className="form__input" type="email" placeholder="Email" name="email" required></input>
      <input className="form__input" type="password" placeholder="Пароль" name="password" required ></input>
      <button type="submit" aria-label="Зарегистрироваться" className="form__submit-button" onClick={handleClick}>Зарегистрироваться</button>
    </form>
    <Link to="/sign-in" style={{ textDecoration: 'none' }}>
      <p className="form__link">Уже зарегистрированы? Войти</p>
    </Link>
  </div>
  )
}
