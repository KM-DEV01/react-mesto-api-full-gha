import { Link } from "react-router-dom";
import React from "react";
import { AuthForm } from "./AuthForm";

export function Register({onSignUp}) {
  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <AuthForm
          onSubmit={onSignUp}
          submitButtonText={'Зарегистрироваться'}
        />
        <div className="register__sign-in">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="register__link button">Войти</Link></p>
        </div>
      </div>
    </>
  )
}