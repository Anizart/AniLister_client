import { Link } from 'react-router-dom'
import './section_groups.css'

// Временные данные для теста (потом придут с бэкенда)
const MOCK_GROUPS = [
  { id: '1', title: 'Манга', topic: 'read', count: 18 },
  { id: '2', title: 'Аниме', topic: 'watch', count: 1000 },
]

const Groups = ({
  mode,
  onOpenCreatingGroup,
  onOpenEditingGroup,
  onDeleteGroup,
}) => {
  return (
    <div className='container'>
      <section className='groups'>
        <h1 className='groups__title title'>
          Ваши группы:
        </h1>
        <div className='groups__wrapper'>
          {/* Кнопка создания */}
          <button
            type='button'
            className='groups__group add-group'
            onClick={onOpenCreatingGroup}
          >
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
            >
              <line
                y1='23.5'
                x2='48'
                y2='23.5'
                stroke={
                  mode
                    ? 'var(--dark-main-text)'
                    : 'var(--light-main-text)'
                }
              />
              <line
                x1='24.5'
                y1='0'
                x2='24.5'
                y2='48'
                stroke={
                  mode
                    ? 'var(--dark-main-text)'
                    : 'var(--light-main-text)'
                }
              />
            </svg>
          </button>

          {/* Список групп */}
          {MOCK_GROUPS.map((group) => (
            <div
              key={group.id}
              className='groups__item'
            >
              <Link
                to='/list'
                // to={`/list/${group.id}`} потом так
                className='groups__group'
              >
                <h2 className='groups__name'>
                  {group.title}
                </h2>
                <div className='groups__counter'>
                  [{group.count}]
                </div>
              </Link>

              <div className='groups__plate'>
                {/* Редактирование */}
                <button
                  type='button'
                  className='groups__btn'
                  onClick={() => onOpenEditingGroup(group)}
                >
                  {/* SVG карандаша */}
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                  >
                    <path
                      d='M26.57 0C25.19 0 23.81 0.53 22.74 1.6L1.93 22.41L1.85 22.82L0.41 30.06L0 32L1.93 31.58L9.17 30.14L9.58 30.06L30.39 9.25C32.53 7.11 32.53 3.74 30.39 1.6C29.32 0.53 27.94 0 26.57 0ZM26.57 2.5C27.23 2.5 27.9 2.81 28.54 3.45C29.82 4.73 29.82 6.12 28.54 7.4L27.59 8.3L23.69 4.4L24.59 3.45C25.23 2.81 25.9 2.5 26.57 2.5ZM21.84 6.25L25.74 10.15L9.83 26.07C8.96 24.39 7.6 23.03 5.92 22.16L21.84 6.25ZM4.23 24.3C5.81 24.94 7.05 26.18 7.69 27.76L3.37 28.62L4.23 24.3Z'
                      fill={
                        mode
                          ? 'var(--dark-main-text)'
                          : 'var(--light-main-text)'
                      }
                    />
                  </svg>
                </button>
                {/* Удаление */}
                <button
                  type='button'
                  className='groups__btn'
                  onClick={() => onDeleteGroup(group.id)}
                >
                  <svg
                    width='27'
                    height='32'
                    viewBox='0 0 27 32'
                    fill='none'
                  >
                    <path
                      d='M10.8 0C10.09 0 9.37 0.24 8.85 0.75C8.34 1.25 8.1 1.96 8.1 2.66V4H0V6.66H1.35V28C1.35 30.19 3.17 32 5.4 32H21.6C23.82 32 25.65 30.19 25.65 28V6.66H27V4H18.9V2.66C18.9 1.96 18.65 1.25 18.14 0.75C17.62 0.24 16.9 0 16.2 0H10.8ZM10.8 2.66H16.2V4H10.8V2.66ZM4.05 6.66H22.95V28C22.95 28.73 22.34 29.33 21.6 29.33H5.4C4.65 29.33 4.05 28.73 4.05 28V6.66ZM6.75 10.66V25.33H9.45V10.66H6.75ZM12.15 10.66V25.33H14.85V10.66H12.15ZM17.55 10.66V25.33H20.25V10.66H17.55Z'
                      fill='var(--warning-color)'
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Groups
