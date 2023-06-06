import logo from "../images/mesto-logo.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export function Header(props) {
  let location = useLocation();

  function logout() {

  }
  const child = () => {
    switch (location.pathname) {
      case '/sign-in':
        return (<Link to="/sign-up" className="register__link button">Регистрация</Link>);
      case '/sign-up':
        return (<Link to="/sign-in" className="register__link button">Войти</Link>);
      case '/':
        return (
          <>
            <p className="header__profile">{props.userData}</p>
            <button className="header__button button" onClick={props.onLogout}>Выйти</button>
          </>
        );
      default:
        return;
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип сервиса Mesto." className="header__logo"/>
      <div className="header__toolbar">
        {child()}
      </div>
    </header>
  );
}
