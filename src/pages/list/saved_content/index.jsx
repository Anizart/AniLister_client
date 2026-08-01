import { useState } from 'react'
import { Link } from 'react-router-dom'

import './saved_content.css'

const SavedContent = ({
  mode,
  group, // Массив карточек из App
  onDeleteCard,
  onOpenAddCard,
  onOpenEditCard,
  searchQuery = '', // Запрос поиска
}) => {
  const cards = group?.cards || [] // Получаю карточки из группы или пустой массив
  const [activeFilter, setActiveFilter] = useState('all')
  // Определяю тип контента для правильных подписей
  const isWatching = group?.topic === 'watch'

  // Логика фильтрации: учитываю и активный тег, и поисковый запрос
  const filteredCards = cards.filter((card) => {
    const matchesFilter =
      activeFilter === 'all' ||
      card.tags.includes(activeFilter)
    const matchesSearch = card.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Функция для подсчета карточек по тегу
  const getCount = (tag) => {
    return cards.filter((card) => card.tags.includes(tag))
      .length
  }

  // Текстовые метки в зависимости от типа
  const labels = {
    volume: isWatching ? 'Сезон' : 'Том',
    chapter: isWatching ? 'Эпизод' : 'Глава',
    page: 'Стр. в Дневнике',
    statusTotal: isWatching
      ? 'Всего просмотрено'
      : 'Всего прочитано',
    statusLiked: 'Понравилось',
    statusFavorites: 'Любимые',
    statusToRead: isWatching
      ? 'Стоит пересмотреть'
      : 'Стоит перечитать',
    statusDropped: 'Брошено',
  }

  return (
    <section className='section-list-content'>
      <div className='container'>
        <div className='filter'>
          <button
            type='button'
            className={`filter__tag ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {labels.statusTotal}: {getCount('all')}
          </button>
          <button
            type='button'
            className={`filter__tag ${activeFilter === 'favorite' ? 'active' : ''}`}
            onClick={() => setActiveFilter('favorite')}
          >
            {labels.statusLiked}: {getCount('favorite')}
          </button>
          <button
            type='button'
            className={`filter__tag ${activeFilter === 'loved' ? 'active' : ''}`}
            onClick={() => setActiveFilter('loved')}
          >
            {labels.statusFavorites}: {getCount('loved')}
          </button>
          <button
            type='button'
            className={`filter__tag ${activeFilter === 'reread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('reread')}
          >
            {labels.statusToRead}: {getCount('reread')}
          </button>
          <button
            type='button'
            className={`filter__tag ${activeFilter === 'dropped' ? 'active' : ''}`}
            onClick={() => setActiveFilter('dropped')}
          >
            {labels.statusDropped}: {getCount('dropped')}
          </button>
        </div>
        <button
          className='btn section-list-content__btn-add'
          onClick={() =>
            onOpenAddCard(group?.id, group?.topic)
          }
        >
          Добавить
          <svg
            width='37'
            height='37'
            viewBox='0 0 37 37'
            fill='transparent'
            stroke={
              mode
                ? 'var(--accent-text)'
                : 'var(--light-main-text)'
            }
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M18.5 36.5C28.4411 36.5 36.5 28.4411 36.5 18.5C36.5 8.55887 28.4411 0.5 18.5 0.5C8.55887 0.5 0.5 8.55887 0.5 18.5C0.5 28.4411 8.55887 36.5 18.5 36.5Z' />
            <path d='M5 18.5115H32.5979' />
            <path d='M19.0864 5V32.5979' />
          </svg>
          Карточку
        </button>

        <div className='section-list-content__cards'>
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div
                key={card.id}
                className='section-list-content__card'
                data-tags={card.tags.join(' ')}
              >
                <div className='section-list-content__info'>
                  <div className='section-list-content__details'>
                    <img
                      src={card.image}
                      alt={card.title}
                      className='section-list-content__img'
                    />
                    <div className='section-list-content__info-wrap'>
                      <p className='section-list-content__name'>
                        {card.title}
                      </p>
                      <div className='section-list-content__specialty'>
                        <p className='section-list-content__specialty-elem'>
                          {labels.volume}: {card.volume}-й
                        </p>
                        <p className='section-list-content__specialty-elem'>
                          {labels.chapter}: {card.chapter}-я
                        </p>
                        <p className='section-list-content__specialty-elem'>
                          {labels.page}: {card.page}-я
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='section-list-content__marks'>
                    <div className='section-list-content__marks-wrap'>
                      {/* Прочитано (соответствует finished) */}
                      {card.marks.finished && (
                        <svg
                          width='32'
                          height='46'
                          viewBox='0 0 32 46'
                          fill='none'
                          stroke={
                            mode
                              ? 'var(--dark-main-text)'
                              : 'var(--light-main-text)'
                          }
                        >
                          <path
                            d='M0.5 28.4214C0.764205 29.7666 0.617503 29.3567 0.773783 31.5898C0.897378 33.3558 0.930062 36.4143 1.04757 38.5538C1.22737 41.8275 1.47998 43.7176 1.59631 44.7254C1.71263 45.0023 1.94529 44.8029 6.75705 37.4241C11.5688 30.0454 20.9526 15.4932 30.6208 0.500061'
                            strokeLinecap='round'
                          />
                        </svg>
                      )}

                      {/* Глаз (соответствует reread) */}
                      {card.marks.reread && (
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
                      )}

                      {/* Подчеркнутое сердце (соответствует loved) */}
                      {card.marks.loved && (
                        <svg
                          width='39'
                          height='39'
                          viewBox='0 0 39 39'
                          fill='none'
                          stroke={
                            mode
                              ? 'var(--dark-main-text)'
                              : 'var(--light-main-text)'
                          }
                        >
                          <path d='M0.657715 38.0234H37.8658' />
                          <path
                            d='M34.9247 4.16799C34.0197 3.2626 32.9452 2.54438 31.7626 2.05436C30.58 1.56435 29.3124 1.31213 28.0323 1.31213C26.7522 1.31213 25.4846 1.56435 24.302 2.05436C23.1194 2.54438 22.0449 3.2626 21.14 4.16799L19.2619 6.04614L17.3837 4.16799C15.5558 2.34002 13.0765 1.31308 10.4914 1.31308C7.90626 1.31308 5.42701 2.34002 3.59904 4.16799C1.77108 5.99595 0.744141 8.47524 0.744141 11.0603C0.744141 13.6454 1.77108 16.1247 3.59904 17.9526L19.2619 33.6155L34.9247 17.9526C35.8301 17.0477 36.5483 15.9732 37.0383 14.7906C37.5283 13.608 37.7805 12.3404 37.7805 11.0603C37.7805 9.78024 37.5283 8.51264 37.0383 7.33004C36.5483 6.14744 35.8301 5.07295 34.9247 4.16799Z'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      )}

                      {/* Сердце (соответствует favorite) */}
                      {card.marks.favorite && (
                        <svg
                          width='43'
                          height='38'
                          viewBox='0 0 43 38'
                          fill='none'
                          stroke={
                            mode
                              ? 'var(--dark-main-text)'
                              : 'var(--light-main-text)'
                          }
                        >
                          <path
                            d='M39.0826 3.72365C38.0611 2.70166 36.8482 1.89094 35.5133 1.33782C34.1784 0.784694 32.7476 0.5 31.3026 0.5C29.8576 0.5 28.4268 0.784694 27.0919 1.33782C25.757 1.89094 24.5441 2.70166 23.5226 3.72365L21.4026 5.84365L19.2826 3.72365C17.2192 1.66027 14.4206 0.50107 11.5026 0.50107C8.58452 0.50107 5.78597 1.66027 3.72258 3.72365C1.6592 5.78704 0.5 8.58558 0.5 11.5037C0.5 14.4217 1.6592 17.2203 3.72258 19.2837L21.4026 36.9636L39.0826 19.2837C40.1046 18.2621 40.9153 17.0493 41.4684 15.7144C42.0215 14.3794 42.3062 12.9486 42.3062 11.5037C42.3062 10.0587 42.0215 8.62786 41.4684 7.29294C40.9153 5.95802 40.1046 4.74516 39.0826 3.72365Z'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      )}

                      {/* Крестик (соответствует dropped) */}
                      {card.marks.dropped && (
                        <svg
                          width='38'
                          height='38'
                          viewBox='0 0 38 38'
                          fill='none'
                          stroke={
                            mode
                              ? 'var(--dark-main-text)'
                              : 'var(--light-main-text)'
                          }
                        >
                          <path
                            d='M2.67278 0L0 2.67278L17 19L0 35.3272L2.67278 38L19 21L35.3272 38L38 35.3272L21 19L38 2.67278L35.3272 0L19 17L2.67278 0Z'
                            fill={
                              mode
                                ? 'var(--dark-main-text)'
                                : 'var(--light-main-text)'
                            }
                          />
                        </svg>
                      )}
                    </div>

                    <div className='section-list-content__date'>
                      <p className='section-list-content__date-elem'>
                        Дата начала: {card.startDate}г.
                      </p>
                      <p className='section-list-content__date-elem'>
                        Дата окончания: {card.endDate}г.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='section-list-content__btns'>
                  <button
                    className='btn'
                    onClick={() =>
                      onOpenEditCard(card, group?.id)
                    }
                  >
                    Изменить
                  </button>
                  <button
                    className='btn btn-warning'
                    onClick={() => onDeleteCard(card.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {cards.length === 0
                ? 'В этой группе пока нет карточек. Нажмите "Добавить", чтобы создать первую!'
                : 'По вашему запросу ничего не найдено.'}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SavedContent
