import "./advantages.css"

import mascot from "/images/mascot_advantages-section.png"

const Advantages = () => {
  return (
    <section className="section">
      <div className="container">
        <img src={mascot} alt="mascot" className="advantages-img" />
        <div className="wrap">
          <h2 className="title">Зачем это и чем удобно?</h2>
          <ul className="wrap__list">
            <li className="text wrap__item">
              Отчетный прогресс — сколько серий посмотрел, сколько глав
              прочитал;
            </li>
            <li className="text wrap__item">
              Делай метки — ставь метки (любимое, просмотрано/прочитано, можно
              пересмотреть/перечитать и так далее);
            </li>
            <li className="text wrap__item">
              Следи за количеством — сколько посмотрел, сколько прочёл;
            </li>
            <li className="text wrap__item">
              Фильтруй — удобно фильтровать по критериям произведения, чтобы
              быстро найти необходимый тайтл;
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Advantages
