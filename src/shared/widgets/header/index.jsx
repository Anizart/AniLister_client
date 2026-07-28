import { NavLink } from 'react-router-dom'
import './header.css'

import defaultImage from '/images/svg/default_image.svg'
import Logo from '../../ui/logo'

const Header = ({
  mode,
  onToggleMode,
  onOpenSignUp,
  currentUser,
  onOpenAuthentication,
}) => {
  //+ Получение пользователя:
  const user = currentUser
    ? {
        name: currentUser.name,
        img: currentUser.avatarUrl,
      }
    : null

  // Определение ссылку:
  const homeLink = currentUser ? '/profile' : '/'
  const linkText = currentUser ? 'Профиль' : 'Главная'

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo mode={mode} />
          <nav className='header__wrapper-elem'>
            {/* Переключатель темы сайта */}
            <div
              className={`header__toggle-container ${
                mode ? 'toggle-container-bg' : ''
              }`}
              id='toggle-dark-mode'
              onClick={() => onToggleMode(!mode)}
            >
              <div
                className={`header__circle ${mode ? 'circle-transform' : ''}`}
              ></div>
            </div>
            {/* /Переключатель темы сайта */}

            <NavLink
              to={homeLink}
              end
              className='link'
            >
              {linkText}
            </NavLink>

            {/* Вход/Аккаунт */}
            {user ? (
              <div className='header__user'>
                <img
                  src={user.img}
                  alt={user.name}
                  className='user__img'
                />
                {user.name}
              </div>
            ) : (
              <>
                <button
                  type='button'
                  className='header__sign'
                  onClick={onOpenAuthentication}
                >
                  Войти
                </button>
                <button
                  type='button'
                  className='header__sign'
                  onClick={onOpenSignUp}
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
