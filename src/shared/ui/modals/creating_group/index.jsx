import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

import '../modals.css'
import './creating_group.css'
import { useScrollLock } from '@/shared/lib/useScrollLock'

import PasswordInput from '@/shared/ui/modals/password_input'

const ModalCreatingGroup = ({
  mode,
  isOpen,
  onClose,
  onOpenUnderConstruction,
}) => {
  useScrollLock(isOpen)

  // Состояния полей
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')

  // Состояния ошибок
  const [errors, setErrors] = useState({
    title: '',
    topic: '',
  })

  // Флаг: пробовали ли отправить (для показа ошибок)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Сброс формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTopic('')
      setErrors({ title: '', topic: '' })
      setIsSubmitted(false)
    }
  }, [isOpen])

  // Запрещаю скролл при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  // Валидатор
  const validateTitle = (value) => {
    if (!value) return 'Назовите группу'
    if (value.length > 10)
      return 'Название не должно быть больше 10 символов'
    return ''
  }

  const validateTopic = (value) => {
    if (!value) return 'Выберите тему группы'
    return ''
  }
  // /Валидатор

  // Проверка при изменении поля
  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value)
    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        title: validateTitle(value),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const titleError = validateTitle(title)
    const topicError = validateTopic(topic)

    setErrors({
      title: titleError,
      topic: topicError,
    })

    const isValid = !titleError && !topicError

    if (isValid) {
      // Валидация прошла — временно открываю under construction
      onClose()
      onOpenUnderConstruction()
    }
  }

  return createPortal(
    <div
      className='modal'
      onClick={onClose}
    >
      <div
        className='modal__content content-auth-modals'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal__btn-close'
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
                  ? 'var(--dark-main-text)'
                  : 'var(--light-main-text)'
              }
            />
          </svg>
        </button>
        <form
          onClick={(e) => e.stopPropagation()}
          className='modal__wrapper'
          autoComplete='on'
          onSubmit={handleSubmit}
        >
          <h2 className='title'>Создание группы</h2>
          <div className='modal__wrapper-input-title'>
            <input
              type='text'
              name='title'
              autoComplete='text'
              placeholder=' '
              id='title'
              className={`modal__input-title ${
                errors.title ? 'modal__input--error' : ''
              }`}
              value={title}
              onChange={handleTitleChange}
              tabIndex={1}
            />
            <label
              htmlFor='title'
              className='modal__label-title'
            >
              Название (до 10 символов)
            </label>
            {errors.title && (
              <span className='modal__error'>
                {errors.title}
              </span>
            )}
          </div>
          <div className='modal__group-options'>
            <h3 className='modal__options-title'>
              Выбери, о чём будет группа:
            </h3>
            <div className='modal__checkbox-group'>
              <label className='modal__checkbox-label'>
                <input
                  type='radio'
                  name='topic'
                  value='watch'
                  checked={topic === 'watch'}
                  onChange={(e) => setTopic(e.target.value)}
                  className='modal__checkbox'
                />
                <span className='modal__checkbox-custom'></span>
                {/* Если нужен кастомный чекбокс */}
                Смотрю (фильмы, аниме и т.д.)
              </label>

              <label className='modal__checkbox-label'>
                <input
                  type='radio'
                  name='topic'
                  value='read'
                  checked={topic === 'read'}
                  onChange={(e) => setTopic(e.target.value)}
                  className='modal__checkbox'
                />
                <span className='modal__checkbox-custom'></span>
                Читаю (книги, манга и т.д.)
              </label>
            </div>
            {/* Ошибка выбора темы */}
            {errors.topic && (
              <span className='modal__error modal__error--topic'>
                {errors.topic}
              </span>
            )}
          </div>
          <div className='modal__wrap-btn'>
            <button
              type='button'
              className='btn btn-warning'
              onClick={onClose}
              tabIndex={2}
            >
              Отмена
            </button>
            <button
              type='submit'
              className='btn'
              tabIndex={3}
            >
              Готово
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body, // рендерю в body, чтобы не мешали родительские стили
  )
}

export default ModalCreatingGroup
