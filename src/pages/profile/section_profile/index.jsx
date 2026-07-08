import './profile.css'

import default_image from '/images/svg/default_image.svg'

const UserProfile = ({
  onOpenEditProfile,
  onDeleteProfile,
  onLogout,
}) => {
  return (
    <div className='container'>
      <section className='profile'>
        <div className='profile__info'>
          <img
            className='profile__img'
            src={default_image}
            alt='#'
          />
          <div className='profile__details'>
            <p className='profile__name'>Имя: test</p>
            <p className='profile__email'>
              Почта: testtesttesttesttest@gmail.com
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
