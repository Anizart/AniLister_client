import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import "./header.css"

import logo from "/images/svg/logo.svg"
import mobile_logo from "/images/svg/mobile_logo.svg"
import { useSeasonalTheme } from "../../lib/useSeasonalTheme" // для нового года
// import { userProfile } from "@/shared/api/user" //- !

const Header = ({ mode, onToggleMode }) => {
  const { isXmas } = useSeasonalTheme() // для нового года
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
          <Link to="/" className="header__link-logo">
            <picture>
              <source media="(max-width: 558px)" srcset={mobile_logo}></source>
              <img src={logo} alt="logo" height="40" />
            </picture>
            {isXmas ? (
              <img
                src="/images/svg/christmas_tree.svg"
                alt="Christmas tree"
                className="header__christmas-img"
              />
            ) : (
              ""
            )}
          </Link>
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
                >
                  Войти
                </button>
                <button
                  type="button"
                  className="header__sign"
                  // onClick={() => setIsSignUpOpen(!isSignUpOpen)} //- !
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
