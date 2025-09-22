import "./welcome.css"
import mascot from "/images/mascot_welcome-section.png"

const Welcome = () => {
  return (
    <section className="section section-welcome">
      <div className="container">
        <img src={mascot} alt="mascot" className="img welcome-img" />
        <div className="offer">
          <h1 className="title offer__title">Список. Прогресс. Память.</h1>
          <div className="text offer__text">
            Сколько аниме ты уже посмотрел?
            <br /> А сколько манги прочитал?
            <br /> Где остановился? Когда смотрел?
            <br /> Что пересмотреть? Что понравилось?
            <br /> Что забросил? ... <br /> Теперь всё это можно отметить, найти
            и вспомнить — в одном месте.
            <br /> AniLister — твой личный дневник.
          </div>
          <button className="btn">Начать список</button>
        </div>
      </div>
    </section>
  )
}

export default Welcome
