import "./profile.css"
import { Link } from "react-router"

import default_image from "/images/svg/default_image.svg"

const UserProfile = () => {
  return (
    <div className="container">
      <div className="profile">
        <div className="profile__info">
          <img className="profile__img" src={default_image} alt="#" />
          <div className="profile__details">
            <p className="profile__name">Имя: test</p>
            <p className="profile__email">Почта: test</p>
          </div>
        </div>
        <div className="profile__btn">
          <button type="button" className="btn">
            Изменить
          </button>
          <div className="profile__btn-red">
            <button type="button" className="btn btn-warning">
              Выйти
            </button>
            <button type="button" className="btn btn-warning">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
