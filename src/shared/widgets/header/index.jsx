import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "./header.css"

import Logo from "../../ui/logo"
// import { userProfile } from "@/shared/api/user" //- !

const Header = ({ mode, onToggleMode, onOpenModal }) => {
  const [user, setUser] = useState(null) // user

  //+ Получение пользователя:
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userProfile()
        if (response?.name) {
          setUser({ name: response.name, img: response.img })
        }
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error)
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo mode={mode} />
          <nav className="header__wrapper-elem">
            {/* Переключатель темы сайта */}
            <div
              className={`header__toggle-container ${
                mode ? "toggle-container-bg" : ""
              }`}
              id="toggle-dark-mode"
              onClick={() => onToggleMode(!mode)}
            >
              <div
                className={`header__circle ${mode ? "circle-transform" : ""}`}
              ></div>
            </div>
            {/* /Переключатель темы сайта */}
            <NavLink to="/" end className="link">
              Главная
            </NavLink>
            {/* Вход/Аккаунт */}
            {user ? (
              <div className="header__user">
                {user.img ? (
                  <img
                    src={`НАЧАЛО_ССЫЛКИ_НА_СЕРВЕР/${user.img}`}
                    alt={user.name}
                    className="user__img"
                  />
                ) : (
                  <img
                    src="/public/images/svg/default_image.svg"
                    alt={user.name}
                    className="user__img" //- ЭТО ТЕСТИРОВАТЬ!
                  />
                )}
                {user.name}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="header__sign"
                  // onClick={() => setIsSignInOpen(!isSignInOpen)} //- !
                  onClick={onOpenModal} // - ВРЕМЕННО
                >
                  Войти
                </button>
                <button
                  type="button"
                  className="header__sign"
                  // onClick={() => setIsSignUpOpen(!isSignUpOpen)} //- !
                  onClick={onOpenModal} // - ВРЕМЕННО
                >
                  Регистрация
                </button>
              </>
            )}
            {/* /Вход/Аккаунт */}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
