import { createPortal } from 'react-dom'
import { useState, useEffect, useRef } from 'react'

import '../modals.css'
import './adding_card.css'
import { useScrollLock } from '@/shared/lib/useScrollLock'

// Дефолтная обложка
const DEFAULT_COVER = '/images/default.jpg'

const AddingCard = ({
  mode,
  isOpen,
  onClose,
  onOpenUnderConstruction,
  cardData = null,
}) => {
  useScrollLock(isOpen)

  const isEditing = !!cardData
  const [topic, setTopic] = useState(
    cardData?.topic || 'read',
  )
  const searchRef = useRef(null)

  // Состояния формы
  const [formData, setFormData] = useState({
    title: '',
    field1: '',
    field2: '',
    diaryPage: '',
    startDate: '',
    endDate: '',
    isRereading: '',
  })

  const [marks, setMarks] = useState({
    finished: false,
    reread: false,
    favorite: false,
    loved: false, // Подчеркнутое сердце
    dropped: false,
  })

  const [errors, setErrors] = useState({})
  const [coverImage, setCoverImage] =
    useState(DEFAULT_COVER)

  // Состояние поиска
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Инициализация данных
  useEffect(() => {
    if (isEditing && cardData) {
      setFormData({
        title: cardData.title || '',
        field1: cardData.volume || '',
        field2: cardData.chapter || '',
        diaryPage: cardData.page || '',
        startDate: cardData.startDate || '',
        endDate:
          cardData.endDate === '-'
            ? ''
            : cardData.endDate || '',
        isRereading: cardData.isRereading?.toString() || '',
      })
      setCoverImage(cardData.image || DEFAULT_COVER)
      setMarks({
        finished: !!cardData.marks?.finished,
        reread: !!cardData.marks?.reread,
        favorite: !!cardData.marks?.favorite,
        loved: !!cardData.marks?.loved,
        dropped: !!cardData.marks?.dropped,
      })
      setTopic(cardData.topic || 'read')
    } else {
      resetForm()
    }
    setErrors({})
  }, [cardData, isEditing, isOpen])

  const resetForm = () => {
    setFormData({
      title: '',
      field1: '',
      field2: '',
      diaryPage: '',
      startDate: '',
      endDate: '',
      isRereading: '',
    })
    setMarks({
      finished: false,
      reread: false,
      favorite: false,
      loved: false,
      dropped: false,
    })
    setCoverImage(DEFAULT_COVER)
    setSearchQuery('')
    setSearchResults([])
  }

  // Поиск на Shikimori с debounce
  // Поиск на Shikimori (аниме + манга) через CORS-прокси
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        // Запрос к ТВОЕМУ API-роуту (работает и локально, и на Vercel)
        const res = await fetch(
          `/api/search-shikimori?query=${encodeURIComponent(searchQuery)}`,
        )

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()

        // Дополнительная проверка: точно ли это массив
        if (!Array.isArray(data)) {
          throw new Error('Некорректный ответ сервера')
        }

        setSearchResults(data)
      } catch (e) {
        console.error('Ошибка поиска:', e)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Закрытие поиска при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchResults([])
      }
    }
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
  }, [])

  const fetchImageProxy = async (shikimoriUrl) => {
    try {
      const res = await fetch(
        `/api/image-proxy?url=${encodeURIComponent(shikimoriUrl)}`,
      )
      if (!res.ok) throw new Error('Ошибка прокси')
      const data = await res.json()
      return data.imageUrl // Возвращаю data:image/...;base64,...
    } catch (e) {
      console.error('Не удалось загрузить обложку:', e)
      return DEFAULT_COVER // Фолбэк на дефолтную картинку
    }
  }

  const handleSelectSearchResult = async (item) => {
    const title = item.russian || item.name
    const topic =
      item.contentType === 'manga' ? 'read' : 'watch'

    const imageUrl = `https://shikimori.io${item.image?.x96}`

    setFormData((prev) => ({ ...prev, title }))
    setSearchQuery(title)
    setCoverImage(imageUrl)
    setTopic(topic)
    setSearchResults([])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'title') {
      setSearchQuery(value)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name])
      setErrors((prev) => {
        const n = { ...prev }
        delete n[name]
        return n
      })
  }

  const handleSpin = (fieldName, delta) => {
    setFormData((prev) => {
      const val = parseInt(prev[fieldName], 10) || 0
      return {
        ...prev,
        [fieldName]: String(Math.max(0, val + delta)),
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.title.trim())
      newErrors.title = 'Название обязательно'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      id: cardData?.id,
      ...formData,
      topic,
      image:
        coverImage !== DEFAULT_COVER ? coverImage : null,
      marks: Object.entries(marks)
        .filter(([_, v]) => v)
        .map(([k]) => k),
    }

    console.log(
      isEditing ? 'Обновление:' : 'Создание:',
      payload,
    )
    onClose()
    onOpenUnderConstruction()
  }

  const MarkIcon = ({ type }) => {
    const color = mode
      ? 'var(--dark-main-text)'
      : 'var(--light-main-text)'
    const activeColor = mode
      ? 'var(--accent-dark)'
      : 'var(--accent-light)'
    const isActive = marks[type]
    const fill = isActive ? activeColor : color

    switch (type) {
      case 'finished':
        return (
          <svg
            width='24'
            height='35'
            viewBox='0 0 35 51'
            fill='none'
          >
            <path
              d='M0.5 32.0173C0.798232 33.5357 0.632636 33.073 0.809043 35.5937C0.948555 37.5872 0.985449 41.0396 1.11809 43.4546C1.32105 47.1499 1.60619 49.2834 1.7375 50.421C1.86881 50.7335 2.13143 50.5085 7.56288 42.1795C12.9943 33.8504 23.5867 17.4241 34.5 0.5'
              stroke={fill}
              strokeLinecap='round'
            />
          </svg>
        )
      case 'reread':
        return (
          <svg
            width='39'
            height='44'
            viewBox='0 0 39 44'
            fill='none'
            stroke={
              mode
                ? 'var(--dark-main-text)'
                : 'var(--light-main-text)'
            }
          >
            <path
              d='M32.8246 10.8394C32.748 10.7606 32.6564 10.6977 32.5553 10.6546C32.4542 10.6114 32.3455 10.5888 32.2355 10.588C32.1256 10.5873 32.0166 10.6083 31.9148 10.6501C31.8131 10.6918 31.7207 10.7533 31.6429 10.831C31.5652 10.9088 31.5037 11.0012 31.462 11.1029C31.4203 11.2047 31.3992 11.3137 31.3999 11.4236C31.4007 11.5336 31.4233 11.6422 31.4665 11.7434C31.5096 11.8445 31.5725 11.936 31.6513 12.0127C38.462 18.8233 38.462 29.8411 31.6513 36.6517C24.8406 43.4624 13.8229 43.4624 7.0122 36.6517C0.201601 29.8411 0.201601 18.8233 7.0122 12.0127C10.9385 8.08652 16.2612 6.43692 21.3736 7.03772L17.5718 10.8394C17.493 10.916 17.4302 11.0076 17.387 11.1087C17.3439 11.2098 17.3213 11.3185 17.3205 11.4285C17.3197 11.5384 17.3408 11.6474 17.3825 11.7491C17.4242 11.8509 17.4857 11.9433 17.5635 12.021C17.6412 12.0988 17.7337 12.1603 17.8354 12.202C17.9371 12.2437 18.0461 12.2648 18.1561 12.264C18.266 12.2633 18.3747 12.2406 18.4758 12.1975C18.5769 12.1543 18.6685 12.0915 18.7451 12.0127L23.7018 7.05602L24.6116 6.14622L18.7451 0.279813C18.6685 0.200983 18.5769 0.138163 18.4758 0.095013C18.3747 0.051863 18.266 0.0292333 18.1561 0.0284633C18.0461 0.0276833 17.9371 0.0487631 17.8354 0.0904831C17.7337 0.132193 17.6412 0.193713 17.5635 0.271463C17.4857 0.349203 17.4242 0.441623 17.3825 0.543353C17.3408 0.645083 17.3197 0.754083 17.3205 0.864033C17.3213 0.973973 17.3439 1.08267 17.387 1.18379C17.4302 1.28492 17.493 1.37646 17.5718 1.4531L21.5019 5.38312C15.9218 4.74822 10.1143 6.56402 5.839 10.8394C-1.60584 18.2842 -1.60584 30.3802 5.839 37.825C13.2837 45.2698 25.3798 45.2698 32.8246 37.825C40.2694 30.3802 40.2694 18.2842 32.8246 10.8394Z'
              fill={
                mode
                  ? 'var(--dark-main-text)'
                  : 'var(--light-main-text)'
              }
            />
            <path d='M4.21582 24.3322C4.21582 24.3322 9.84052 14.7234 19.6837 14.7234C29.5269 14.7234 35.1516 24.3322 35.1516 24.3322C35.1516 24.3322 29.5269 33.941 19.6837 33.941C9.84052 33.941 4.21582 24.3322 4.21582 24.3322Z' />
            <path d='M19.6838 27.9355C22.0136 27.9355 23.9023 26.3222 23.9023 24.3322C23.9023 22.3421 22.0136 20.7289 19.6838 20.7289C17.354 20.7289 15.4653 22.3421 15.4653 24.3322C15.4653 26.3222 17.354 27.9355 19.6838 27.9355Z' />
          </svg>
        )
      case 'favorite':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 43 38'
            fill='none'
          >
            <path
              d='M39.0826 3.72365C38.0611 2.70166 36.8482 1.89094 35.5133 1.33782C34.1784 0.784694 32.7476 0.5 31.3026 0.5C29.8576 0.5 28.4268 0.784694 27.0919 1.33782C25.757 1.89094 24.5441 2.70166 23.5226 3.72365L21.4026 5.84365L19.2826 3.72365C17.2192 1.66027 14.4206 0.50107 11.5026 0.50107C8.58452 0.50107 5.78597 1.66027 3.72258 3.72365C1.6592 5.78704 0.5 8.58558 0.5 11.5037C0.5 14.4217 1.6592 17.2203 3.72258 19.2837L21.4026 36.9636L39.0826 19.2837C40.1046 18.2621 40.9153 17.0493 41.4684 15.7144C42.0215 14.3794 42.3062 12.9486 42.3062 11.5037C42.3062 10.0587 42.0215 8.62786 41.4684 7.29294C40.9153 5.95802 40.1046 4.74516 39.0826 3.72365Z'
              stroke={fill}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )
      case 'loved':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 43 43'
            fill='none'
          >
            <path
              d='M36.9247 8.16805C36.0197 7.26266 34.9452 6.54444 33.7626 6.05442C32.58 5.56441 31.3124 5.31219 30.0323 5.31219C28.7522 5.31219 27.4846 5.56441 26.302 6.05442C25.1194 6.54444 24.0449 7.26266 23.14 8.16805L21.2619 10.0462L19.3837 8.16805C17.5558 6.34008 15.0765 5.31314 12.4914 5.31314C9.90626 5.31314 7.42701 6.34008 5.59904 8.16805C3.77108 9.99601 2.74414 12.4753 2.74414 15.0604C2.74414 17.6455 3.77108 20.1248 5.59904 21.9527L21.2619 37.6156L36.9247 21.9527C37.8301 21.0478 38.5483 19.9733 39.0383 18.7907C39.5283 17.6081 39.7805 16.3405 39.7805 15.0604C39.7805 13.7803 39.5283 12.5127 39.0383 11.3301C38.5483 10.1475 37.8301 9.07301 36.9247 8.16805Z'
              stroke={fill}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <line
              x1='5'
              y1='40'
              x2='38'
              y2='40'
              stroke={fill}
              strokeWidth='2'
            />
          </svg>
        )
      case 'dropped':
        return (
          <svg
            width='24'
            height='24'
            viewBox='0 0 38 38'
            fill='none'
          >
            <path
              d='M2.67278 0L0 2.67278L17 19L0 35.3272L2.67278 38L19 21L35.3272 38L38 35.3272L21 19L38 2.67278L35.3272 0L19 17L2.67278 0Z'
              fill={fill}
            />
          </svg>
        )
      default:
        return null
    }
  }

  const isReading = topic === 'read'
  const labels = {
    field1: isReading ? 'Том' : 'Сезон',
    field2: isReading ? 'Глава' : 'Серия',
    toggle: isReading ? 'Перечитываю' : 'Пересматриваю',
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className='modal'
      onClick={onClose}
    >
      <div
        className='modal__content content-auth-modals adding-card-modal'
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
          >
            <path
              d='M2.67 0L0 2.67L16.33 19L0 35.33L2.67 38L19 21.67L35.33 38L38 35.33L21.67 19L38 2.67L35.33 0L19 16.33L2.67 0Z'
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
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <h2 className='title'>
            {isEditing
              ? 'Изменение карточки'
              : 'Добавление карточки'}
          </h2>
          {/* Блок 1: Обложка */}
          <div className='adding-card__footing'>
            <div className='card-cover-placeholder'>
              <img
                className='adding-card__img'
                src={coverImage}
                alt='Обложка'
                onError={(e) =>
                  (e.target.src = DEFAULT_COVER)
                }
              />
            </div>
            {/* Название */}
            <div
              className={`modal__wrapper-input-title ${errors.title ? 'modal__input--error' : ''}`}
              ref={searchRef}
              style={{ position: 'relative' }}
            >
              <input
                type='text'
                name='title'
                value={
                  searchQuery !== ''
                    ? searchQuery
                    : formData.title
                } // Если searchQuery не пуст - показываем его, иначе берём formData.title
                onChange={handleChange}
                placeholder=' '
                id='title'
                className='modal__input-title'
                tabIndex={1}
              />
              <label
                htmlFor='title'
                className='modal__label-title'
              >
                Название
              </label>
              {errors.title && (
                <span className='modal__error-msg'>
                  {errors.title}
                </span>
              )}

              {/* Выпадающий список результатов */}
              {searchResults.length > 0 && (
                <div className='search-dropdown'>
                  {searchResults.map((item) => (
                    <div
                      key={`${item.contentType}-${item.id}`}
                      className='search-item'
                      onClick={() =>
                        handleSelectSearchResult(item)
                      }
                    >
                      <img
                        src={`https://shikimori.io${item.image?.x96}`}
                        referrerPolicy='no-referrer'
                        alt={item.russian || item.name}
                        className='search-item__img'
                        loading='lazy'
                      />
                      <div className='search-item__info'>
                        <span className='search-item__title'>
                          {item.russian || item.name} |{' '}
                          {item.kind}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Блок 2: Числовые поля и даты */}
          <div className='adding-card__wrap'>
            {[
              { key: 'field1', label: labels.field1 },
              { key: 'field2', label: labels.field2 },
              {
                key: 'diaryPage',
                label: 'Стр. в Дневнике',
              },
              {
                key: 'startDate',
                label: 'Дата начала',
                type: 'date',
              },
              {
                key: 'endDate',
                label: 'Дата окончания',
                type: 'date',
              },
              { key: 'isRereading', label: labels.toggle },
            ].map(({ key, label, type }) => (
              <div
                key={key}
                className='adding-card__field-wrapper'
              >
                <label
                  name={key}
                  id={key}
                  className='adding-card__label'
                >
                  {label}
                </label>
                {type === 'date' ? (
                  <input
                    type='date'
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className='adding-card__input adding-card__input-data'
                    placeholder='ДД.ММ.ГГГГ'
                    pattern='[0-9]*'
                    maxLength={10}
                  />
                ) : (
                  <div className='custom-number-input'>
                    <input
                      type='text'
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className='adding-card__input'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      placeholder='0'
                    />
                    <div className='custom-number-input__spinners'>
                      <button
                        type='button'
                        className='custom-number-input__btn'
                        onClick={() => handleSpin(key, 1)}
                        style={{ cursor: 'pointer' }}
                      >
                        <svg
                          width='5'
                          height='5'
                          viewBox='0 0 5 5'
                          fill='none'
                          className='custom-number-input__btn-svg'
                        >
                          <path
                            d='M0 5L2.50842 0L5 5H0Z'
                            fill={
                              mode
                                ? 'var(--dark-main-text)'
                                : 'var(--light-main-text)'
                            }
                          />
                        </svg>
                      </button>
                      <button
                        type='button'
                        className='custom-number-input__btn'
                        onClick={() => handleSpin(key, -1)}
                        style={{ cursor: 'pointer' }}
                      >
                        <svg
                          width='5'
                          height='5'
                          viewBox='0 0 5 5'
                          fill='none'
                        >
                          <path
                            d='M5 0L2.49158 5L4.37114e-07 -4.37114e-07L5 0Z'
                            fill={
                              mode
                                ? 'var(--dark-main-text)'
                                : 'var(--light-main-text)'
                            }
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Блок 3: Отметки с тултипом */}
          <div className='adding-card__marks-section'>
            <div className='adding-card__marks-header'>
              <div className='adding-card__marks-wrap'>
                <span className='adding-card__marks-title'>
                  Отметки
                </span>
                <span className='adding-card__marks-info'>
                  ⓘ
                </span>
                <div className='marks-tooltip-wrapper'>
                  <div className='marks-tooltip'>
                    <span className='marks-tooltip-titlemar'>
                      Отметки позволяют отфильтровать Ваши
                      списки как визуально, так и
                      функционально
                    </span>
                    <div className='tooltip-row'>
                      <div className='tooltip-icon'>
                        <MarkIcon type='finished' />
                      </div>{' '}
                      – прочли/просмотрели
                    </div>
                    <div className='tooltip-row'>
                      <div className='tooltip-icon'>
                        <MarkIcon type='reread' />
                      </div>{' '}
                      – хочу перепрочесть/пересмотреть
                    </div>
                    <div className='tooltip-row'>
                      <div className='tooltip-icon'>
                        <MarkIcon type='favorite' />
                      </div>{' '}
                      – понравилось
                    </div>
                    <div className='tooltip-row'>
                      <div className='tooltip-icon'>
                        <MarkIcon type='loved' />
                      </div>{' '}
                      – любимое
                    </div>
                    <div className='tooltip-row'>
                      <div className='tooltip-icon'>
                        <MarkIcon type='dropped' />
                      </div>{' '}
                      – брошено
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='modal__checkbox-group adding-card__checkbox-wrap'>
              {[
                'finished',
                'reread',
                'favorite',
                'loved',
                'dropped',
              ].map((key) => (
                <label
                  key={key}
                  className={`modal__checkbox-label adding-card__checkbox-label ${marks[key] ? 'is-checked' : ''}`}
                >
                  <input
                    type='checkbox'
                    className='modal__checkbox'
                    checked={marks[key]}
                    onChange={() =>
                      setMarks((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                  />
                  <div className='modal__checkbox-custom'></div>
                  <MarkIcon type={key} />
                </label>
              ))}
            </div>
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
              {isEditing ? 'Изменить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

export default AddingCard
