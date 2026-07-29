import './profile.css'

import default_image from '/images/svg/default_image.svg'

const UserProfile = ({
  userData,
  onLogout,
  onOpenEditProfile,
  onDeleteProfile,
}) => {
  if (!userData) return null

  // Аватарка из данных или заглушка
  const avatarSrc = userData.avatarUrl || default_image

  return (
    <div className='container'>
      <section className='profile'>
        <div className='profile__info'>
          <img
            className='profile__img'
            src={avatarSrc}
            alt={userData.name}
          />
          <div className='profile__details'>
            <p className='profile__name'>
              Имя: {userData.name}
            </p>
            <p className='profile__email'>
              Почта: {userData.email}
            </p>
          </div>
        </div>
        <div className='profile__btn'>
          <button
            type='button'
            className='btn'
            onClick={onOpenEditProfile}
          >
            Изменить
          </button>
          <div className='profile__btn-red'>
            <button
              type='button'
              className='btn btn-warning'
              onClick={onLogout}
            >
              Выйти
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={onDeleteProfile}
            >
              Удалить
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserProfile
