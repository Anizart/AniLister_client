import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from '@/shared/lib/useScrollLock'

import '../modals.css'
import './modal_edit_profile.css'

//- !!! ДЛЯ ДОБАВЛЕНИЯ ФОТО НАДО СДЕЛАТЬЗАЩИТУ И ЧТОБ ПЕРЕДАВАЛИСЬ ТОЛЬКО НУЖНЫЕ ФОРМАТЫ !!!

const ModalEditProfile = ({
  mode,
  isOpen,
  onClose,
  initialData,
  onOpenUnderConstruction, //- ВРЕМЕННО
}) => {
  useScrollLock(isOpen)

  const fileInputRef = useRef(null)
  const currentBlobUrl = useRef(null)

  // ! Хранию сам объект файла для отправки на сервер
  const selectedFile = useRef(null)

  const [name, setName] = useState(initialData?.name || '')
  const [avatarPreview, setAvatarPreview] = useState(
    initialData?.avatarUrl ||
      '/images/svg/default_image.svg',
  )

  // Состояние ошибок
  const [errors, setErrors] = useState({ name: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Инициализация формы
  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name || '')
      setAvatarPreview(
        initialData.avatarUrl ||
          '/images/svg/default_image.svg',
      )

      // Сбрасываю файл при открытии, чтоб не отправить старый
      selectedFile.current = null
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current)
        currentBlobUrl.current = null
      }
      setErrors({ name: '' })
      setIsSubmitted(false)
    }

    return () => {
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current)
        currentBlobUrl.current = null
      }
    }
  }, [isOpen, initialData])

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Сохраняю файл для будущей отправки
      selectedFile.current = file

      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current)
      }

      const objectUrl = URL.createObjectURL(file)
      currentBlobUrl.current = objectUrl
      setAvatarPreview(objectUrl)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Валидация имени
  const validateName = (value) => {
    if (!value.trim()) return 'Имя не может быть пустым'
    if (value.length > 15)
      return 'Имя не должно превышать 15 символов'
    return ''
  }

  // Обработчик отправки
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const nameError = validateName(name)
    setErrors({ name: nameError })

    if (!nameError) {
      // Формирую данные для сервера
      const formData = {
        name: name,
        avatarFile: selectedFile.current, // Вот здесь лежит реальный файл
      }

      //- ВРЕМЕННО
      console.log('Данные готовы к отправке:', formData)
      onClose()
      onOpenUnderConstruction()

      // В БУДУЩЕМ ЗДЕСЬ БУДЕТ:
      // await updateProfile(formData)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className='modal'
      onClick={onClose}
    >
      <form
        className='modal__wrapper modal__content'
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <button
          type='button'
          className='modal__btn-close'
          onClick={onClose}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
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

        <h2 className='title'>
          Редактирование
          <br /> профиля
        </h2>

        <div className='edit-profile__body'>
          <div className='edit-profile__avatar'>
            <div
              className='edit-profile__avatar-wrapper'
              onClick={triggerFileInput}
            >
              <img
                src={avatarPreview}
                alt={name}
                className='edit-profile__avatar-photo'
              />
              <div className='edit-profile__overlay'>
                <svg
                  width='50'
                  height='41'
                  viewBox='0 0 50 41'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g>
                    <path
                      d='M42.5 5.96826H7.5C3.49594 5.96826 0.25 9.33746 0.25 13.4936V33.2151C0.25 37.3712 3.49594 40.7404 7.5 40.7404H42.5C46.5041 40.7404 49.75 37.3712 49.75 33.2151V13.4936C49.75 9.33746 46.5041 5.96826 42.5 5.96826Z'
                      stroke={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                    <path
                      d='M9.75 14.2724C11.1307 14.2724 12.25 13.1106 12.25 11.6775C12.25 10.2443 11.1307 9.08252 9.75 9.08252C8.36929 9.08252 7.25 10.2443 7.25 11.6775C7.25 13.1106 8.36929 14.2724 9.75 14.2724Z'
                      stroke={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                    <path
                      d='M17.0927 0.259277H32.9072C33.8272 0.259277 34.6549 0.840875 34.9966 1.72754L36.6308 5.96814H13.3691L15.0034 1.72754C15.3451 0.840875 16.1727 0.259277 17.0927 0.259277Z'
                      stroke={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                    <path
                      d='M25.25 11.9365C28.0999 11.9365 30.7018 13.0371 32.6841 14.8503C32.363 15.2725 32.0011 15.639 31.6074 15.9404C29.9005 14.4154 27.6789 13.4935 25.25 13.4935C19.8652 13.4935 15.5 18.0245 15.5 23.6137C15.5 29.203 19.8652 33.734 25.25 33.734C30.6348 33.734 35 29.203 35 23.6137C35 22.7346 34.8914 21.8818 34.6885 21.0685C34.9238 20.3504 35.2462 19.6952 35.6386 19.1268C36.1931 20.5083 36.5 22.0238 36.5 23.6137C36.5 30.0629 31.4632 35.291 25.25 35.291C19.0368 35.291 14 30.0629 14 23.6137C14 17.1646 19.0368 11.9365 25.25 11.9365Z'
                      stroke={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                    <path
                      d='M33.75 9.86084C33.75 14.1603 36.3244 17.6457 39.5 17.6457C36.3244 17.6457 33.75 21.131 33.75 25.4305C33.75 21.131 31.1756 17.6457 28 17.6457C31.1756 17.6457 33.75 14.1603 33.75 9.86084ZM33.75 13.1248C33.4433 14.0805 33.0054 14.9466 32.4629 15.6812C31.8344 16.5321 31.0592 17.2134 30.1841 17.6457C31.0592 18.0779 31.8344 18.7592 32.4629 19.6101C33.0054 20.3446 33.4433 21.2105 33.75 22.166C34.0567 21.2105 34.4946 20.3446 35.0371 19.6101C35.6655 18.7594 36.4404 18.0779 37.3154 17.6457C36.4404 17.2134 35.6655 16.5319 35.0371 15.6812C34.4946 14.9466 34.0567 14.0805 33.75 13.1248Z'
                      stroke={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_538_175'>
                      <rect
                        width='50'
                        height='41'
                        fill={
                          mode
                            ? 'var(--dark-main-text)'
                            : 'var(--light-main-text)'
                        }
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>Изменить изображение</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <div className='modal__wrapper-input-title'>
            <input
              type='text'
              name='user'
              id='user'
              placeholder=' '
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (isSubmitted)
                  setErrors((prev) => ({
                    ...prev,
                    name: validateName(e.target.value),
                  }))
              }}
              className={`modal__input-title ${
                errors.title ? 'modal__input--error' : ''
              }`}
            />
            <label
              htmlFor='user'
              className='modal__label-title'
            >
              Имя
            </label>
            {errors.name && (
              <span className='modal__error'>
                {errors.name}
              </span>
            )}
          </div>
        </div>

        <div className='modal__wrap-btn'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            type='submit'
            className='btn'
          >
            Готово
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}

export default ModalEditProfile
