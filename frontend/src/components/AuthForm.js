import React from "react";

export function AuthForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email,
      password
    });
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <input className="auth__input" type="email" placeholder="E-mail" value={email} onChange={handleEmailChange}/>
      <input className="auth__input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange}/>
      <button className="auth__submit-button button" type="submit">{props.submitButtonText}</button>
    </form>
  )
}