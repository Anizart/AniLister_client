import "./welcome.css"

import mascot from "/images/mascot_welcome-section.png"
import mascotChristmas from "/images/mascot_welcome-section-christmas.png"
import circles from "/images/circles_1.png"
import { useSeasonalTheme } from "/src/shared/lib/useSeasonalTheme" // для нового года

// - в разработке (ЗАМЕНИТЬ)
const Welcome = ({ onOpenUnderConstruction }) => {
  const { isXmas } = useSeasonalTheme() // для нового года

  return (
    <section className="section section-welcome">
      <div className="container">
        <picture>
          <source media="(max-width: 584px)" srcSet={circles} />
          <img
            src={isXmas ? mascotChristmas : mascot}
            alt="mascot"
            className="img welcome-img"
          />
        </picture>
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
          <button
            type="button"
            className="btn"
            onClick={onOpenUnderConstruction}
          >
            Начать список
          </button>
        </div>
      </div>
    </section>
  )
}

export default Welcome
