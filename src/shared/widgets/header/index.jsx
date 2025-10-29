// import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./header.css"

import logo from "/images/svg/logo.svg"
// import { userProfile } from "@/shared/api/user"

const Header = ({ mode, onToggleMode }) => {
  // const [user, setUser] = useState("")

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await userProfile()
  //       if (response?.name) {
  //         setUser({ name: response.name, img: response.img })
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при получении профиля пользователя:", error)
  //     }
  //   }

  //   fetchUserProfile()
  // }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="header__link-logo">
            <img src={logo} alt="logo" />
          </Link>
          {/* Переключатель темы сайта */}
          <div className="header__wrapper-elem">
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
          </div>
          {/* /Переключатель темы сайта */}
          {/* Вход/Аккаунт */}
          {/* {user ? (
            <div className="header__user">
              <img
                src={`НАЧАЛО_ССЫЛКИ_НА_СЕРВЕР/${user.img}`} ЕСЛИ КАРТИНКИ НЕ БУДЕТ, ТО ЗАГЛУШКА
                alt={user.name}
              />
              {user.name}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="header__sign-in"
                onClick={() => setIsSignInOpen(!isSignInOpen)}
              >
                Войти
              </button>
              <button
                type="button"
                className="btn header__sing-up"
                onClick={() => setIsSignUpOpen(!isSignUpOpen)}
              >
                Регистрация
              </button>
            </>
          )} */}
          {/* /Вход/Аккаунт */}
        </div>
      </div>
    </header>
  )
}

export default Header
