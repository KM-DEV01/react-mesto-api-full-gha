import React from "react";
import { AuthForm } from "./AuthForm";

export function Login({onSignIn}) {
  return(
    <>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <AuthForm
          onSubmit={onSignIn}
          submitButtonText={'Войти'}
        />
      </div>
    </>
  )
}
