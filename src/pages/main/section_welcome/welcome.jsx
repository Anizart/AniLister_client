import "./welcome.css"
import mascot from "/public/images/mascot_welcome-section.png"

const Welcome = () => {
  return (
    <section className="section">
      <img src={mascot} alt="mascot" className="welcome-img" />
      <div className="offer">
        <div className="offer__title">Список. Прогресс. Память.</div>
        <div className="offer__text">
          Сколько аниме ты уже посмотрел? А сколько манги прочитал? Где
          остановился? Когда смотрел? Что хочешь пересмотреть? Что понравилось?
          Что забросил? ... <br /> Теперь всё это можно отметить, найти и
          вспомнить — в одном месте. AniLister — твой личный дневник.
        </div>
      </div>
    </section>
  )
}

export default Welcome
