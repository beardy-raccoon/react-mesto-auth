export default function Login() {

  const handleClick = (evt) => evt.preventDefault();

    return (
    <div className="form form_login">
      <h2 className="form__title">Вход</h2>
      <form className="form__content">
        <input className="form__input" type="email" placeholder="Email" name="email" required></input>
        <input className="form__input" type="password" placeholder="Пароль" name="password" required ></input>
        <button type="submit" aria-label="Войти" className="form__submit-button" onClick={handleClick}>Войти</button>
      </form>
    </div>
  );
}
