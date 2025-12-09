import { useState } from "react"
import "./password_input.css" // или добавьте стили в общий CSS

const PasswordInput = ({
  mode,
  id,
  name,
  value,
  onChange,
  placeholder = "Пароль",
  error = "",
  tabIndex,
  autoComplete = "current-password",
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="password-input-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`modal__input ${error ? "modal__input--error" : ""}`}
        tabIndex={tabIndex}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
      >
        {showPassword ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={mode ? "var(--dark-main-text)" : "var(--light-main-text)"}
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default PasswordInput
