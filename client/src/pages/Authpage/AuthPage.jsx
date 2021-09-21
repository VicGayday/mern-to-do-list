import React from 'react'
import './AuthPage.scss'

const AuthPage = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="auth-page">
          <h3>Авторизация</h3>
          <form className="form form-login">
            <div className="row">
              <div className="input-field col s12">
                <input type="email" name="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input type="password" name="password" className="validate" />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button className="waves-effect waves-light btn red lighten-1">
                Войти
              </button>
              <a href="/" className="btn-outline btn-reg">
                Нет аккаунта?
              </a>
            </div>
          </form>

          <h3>Регистрация</h3>
          <form className="form form-login">
            <div className="row">
              <div className="input-field col s12">
                <input type="email" name="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input type="password" name="password" className="validate" />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button className="waves-effect waves-light btn red lighten-1">
                Регистрация
              </button>
              <a href="/" className="btn-outline btn-reg">
                Уже зарегистрированы?
              </a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthPage;
