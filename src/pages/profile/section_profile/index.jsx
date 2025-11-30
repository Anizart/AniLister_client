import "./profile.css"

import default_image from "/images/svg/default_image.svg"

const UserProfile = ({ onOpenModal }) => {
  return (
    <div className="container">
      <section className="profile">
        <div className="profile__info">
          <img className="profile__img" src={default_image} alt="#" />
          <div className="profile__details">
            <p className="profile__name">Имя: test</p>
            <p className="profile__email">
              Почта: testtesttesttesttest@gmail.com
            </p>
          </div>
        </div>
        <div className="profile__btn">
          <button type="button" className="btn" onClick={onOpenModal}>
            Изменить
          </button>
          <div className="profile__btn-red">
            <button
              type="button"
              className="btn btn-warning"
              onClick={onOpenModal}
            >
              Выйти
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={onOpenModal}
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
