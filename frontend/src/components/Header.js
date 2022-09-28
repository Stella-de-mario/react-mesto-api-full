import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import logo from "../logo.svg";

function Header( {isLoggedIn, userEmail, onSignOut} ) {
 
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  function changeMenu() {
    setIsOpenedMenu(!isOpenedMenu);
  }
  function signOut() {
    setIsOpenedMenu(false);
    onSignOut();
  }

  return (
    <header className={!isOpenedMenu ? 'header' : 'header header__menu'}>
      <div className="header__container">
        <img src={logo} alt="Логотип Mesto" className="header__logo" />
        <button
          className={`${
            !isOpenedMenu
              ? "header__menu-button"
              : "header__menu-button header__menu-button_close"
          } ${!isLoggedIn && "header__menu-button_logout"}`}
          onClick={changeMenu}
        ></button>
      </div>

      <Switch>
      <Route exact path="/">
          <div
            className={
              !isOpenedMenu
                ? "header__user-data"
                : "header__user-data header__user-data_open"
            }
          >
            <p className="header__email">{userEmail}</p>
            <button className="header__button-close" onClick={signOut}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-in">
          <div
            className={`${!isLoggedIn && "header__link header__link_active"}`}
          >
            <nav>
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            </nav>
          </div>
        </Route>

        <Route path="/sign-up">
          <div
            className={`${!isLoggedIn && "header__link header__link_active"}`}
          >
            <nav>
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            </nav>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;