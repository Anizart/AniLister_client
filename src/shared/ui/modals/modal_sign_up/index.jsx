import { createPortal } from "react-dom"
import { useEffect } from "react"

import "./modal_sign_up.css"
import { useScrollLock } from "@/shared/lib/useScrollLock"
import { Link } from "react-router-dom"

const ModalSignUp = ({ mode, isOpen, onClose }) => {
  useScrollLock(isOpen)

  // Запрещаю скролл при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__btn-close" onClick={onClose}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.67278 0L0 2.67278L16.3272 19L0 35.3272L2.67278 38L19 21.6728L35.3272 38L38 35.3272L21.6728 19L38 2.67278L35.3272 0L19 16.3272L2.67278 0Z"
              fill={mode ? "var(--dark-main-text)" : "var(--light-main-text)"}
            />
          </svg>
        </button>
        <form
          action="#"
          method="post"
          onClick={(e) => e.stopPropagation()}
          className="modal__wrapper"
        >
          <h2 className="title">Регистрация</h2>
          <div className="modal__wrapper-input">
            <label htmlFor="name" className="modal__label">
              Имя/Ник
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="modal__input"
              //   onChange={handleChange}
              required
            />
          </div>
          <div className="modal__wrapper-input">
            <label htmlFor="email" className="modal__label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="modal__input"
              //   onChange={handleChange}
              required
            />
          </div>
          <div className="modal__wrapper-input">
            <label htmlFor="password" className="modal__label">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="modal__input"
              //   onChange={handleChange}
              required
            />
          </div>
          <p>
            Уже есть аккаунт?{" "}
            <Link to="/privacy-policy" target="_blank" className="info__link">
              Войти
            </Link>
          </p>
          <button type="submit" className="btn modal__btn">
            Готово
          </button>
        </form>
      </div>
    </div>,
    document.body // рендерю в body, чтобы не мешали родительские стили
  )
}

export default ModalSignUp
