import React from "react";
import { Link, Route } from "react-router-dom";

export default function Header({ handleClick, loggedIn, email }) {

  return (
    <header className="header">
      <div className="header__wrapper">
      <div className="header__logo"></div>
      {!loggedIn && (<div className="header__menu">
        {<Route path="/sign-up">
          <Link to="/sing-in" className="header__link">Войти</Link>
        </Route>}
        {<Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>}
      </div>)}
      {loggedIn && (<div className="header__auth-menu">
        <p className="header__email">{email}</p>
        <button className="header__button" onClick={handleClick}>Выйти</button></div>)}
        </div>
    </header>
  );
}
