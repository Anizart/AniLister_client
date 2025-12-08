import { createPortal } from "react-dom"
import { useState, useEffect } from "react"

import "../../modals.css"
import "../auth_modals.css"
import { useScrollLock } from "@/shared/lib/useScrollLock"
import { Link } from "react-router-dom"

const ModalSignUp = ({ mode, isOpen, onClose, onOpenUnderConstruction }) => {
  useScrollLock(isOpen)

  // Состояния полей
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Состояния ошибок
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  // Флаг: пробовали ли отправить (для показа ошибок)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Сброс формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      setName("")
      setEmail("")
      setPassword("")
      setErrors({ name: "", email: "", password: "" })
      setIsSubmitted(false)
    }
  }, [isOpen])

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

  // Валидаторы
  const validateName = (value) => {
    if (!value.trim()) return "Имя не может быть пустым"
    if (value.length > 15) return "Имя не должно превышать 15 символов"
    if (!/^[a-zA-Zа-яА-Я0-9_-]+$/.test(value)) {
      return "Разрешены только буквы, цифры, _ и -"
    }
    return ""
  }

  const validateEmail = (value) => {
    if (!value.trim()) return "Email обязателен"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Неверный формат email"
    }
    return ""
  }

  const validatePassword = (value) => {
    if (!value) return "Пароль обязателен"
    if (value.length < 6) return "Пароль должен быть не менее 6 символов"
    if (!/[A-Z]/.test(value)) return "Пароль должен содержать заглавную букву"
    if (!/[0-9]/.test(value)) return "Пароль должен содержать цифру"
    return ""
  }

  // Проверка при изменении поля
  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, name: validateName(value) }))
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setErrors({ name: nameError, email: emailError, password: passwordError })

    const isValid = !nameError && !emailError && !passwordError
    if (isValid) {
      // ✅ Валидация прошла — временно открываю under construction
      onClose()
      onOpenUnderConstruction()
    }
  }

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content content-auth-modals"
        onClick={(e) => e.stopPropagation()}
      >
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
          onSubmit={handleSubmit}
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
              className={`modal__input ${
                errors.name ? "modal__input--error" : ""
              }`}
              value={name}
              onChange={handleNameChange}
              placeholder="(до 15 символов)"
              tabIndex={1}
            />
            {errors.name && <span className="modal__error">{errors.name}</span>}
          </div>
          <div className="modal__wrapper-input">
            <label htmlFor="email" className="modal__label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`modal__input ${
                errors.email ? "modal__input--error" : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              placeholder="email@gmail.com"
              tabIndex={2}
            />
            {errors.email && (
              <span className="modal__error">{errors.email}</span>
            )}
          </div>
          <div className="modal__wrapper-input">
            <label htmlFor="password" className="modal__label">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              className={`modal__input ${
                errors.password ? "modal__input--error" : ""
              }`}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Как можно надёжнее"
              tabIndex={3}
            />
            {errors.password && (
              <span className="modal__error">{errors.password}</span>
            )}
          </div>
          <span>
            Уже есть аккаунт?{" "}
            <span tabIndex={4} className="link-underline">
              Войти
            </span>
          </span>
          <span>
            Нажимая «Готово» вы принимаете: <br />
            <Link
              to="/privacy-policy"
              target="_blank"
              className="link-underline"
              tabIndex={5}
            >
              Политику конфиденциальности
            </Link>
            и
            <Link
              to="/terms-of-service"
              target="_blank"
              className="link-underline"
              tabIndex={6}
            >
              Пользовательское соглашение
            </Link>
          </span>
          <button type="submit" className="btn modal__btn" tabIndex={7}>
            Готово
          </button>
        </form>
      </div>
    </div>,
    document.body // рендерю в body, чтобы не мешали родительские стили
  )
}

export default ModalSignUp
