import "./notfoundPage.css"
import { Link } from "react-router"

import mascot from "/images/mascot_notfound-page-404.png"

const NotfoundPage = () => {
  return (
    <div className="container">
      <div className="notfound-page">
        <div className="notfound-page__wrap">
          <div className="notfound-page__info">
            <h2 className="title notfound-page__title">404</h2>
            <div className="text notfound-page__text">
              Извините, но такая страница не найдена
            </div>
            <Link to="/" className="btn notfound-page__btn">
              На главную
            </Link>
          </div>
          <img
            className="notfound-page__img"
            src={mascot}
            alt="Маскот (ошибка 404)"
          />
        </div>
      </div>
    </div>
  )
}

export default NotfoundPage
