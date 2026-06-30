import { useEffect } from 'react'

import './toast.css'

const Toast = ({
  mode,
  message,
  isOpen,
  onClose,
  duration = 3000,
}) => {
  // Автозакрытие через указанное время
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  return (
    <div className='toast'>
      <p className='toast__text'>{message}</p>

      <button
        className='toast__btn-close'
        onClick={onClose}
      >
        <svg
          width='38'
          height='38'
          viewBox='0 0 38 38'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.67278 0L0 2.67278L16.3272 19L0 35.3272L2.67278 38L19 21.6728L35.3272 38L38 35.3272L21.6728 19L38 2.67278L35.3272 0L19 16.3272L2.67278 0Z'
            fill={
              mode
                ? 'var(--light-main-text)'
                : 'var(--dark-main-text)'
            }
          />
        </svg>
      </button>
    </div>
  )
}

export default Toast
