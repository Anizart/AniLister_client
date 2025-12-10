import { useEffect, useRef } from "react"
import "./advantages.css"

import mascot from "/images/mascot_advantages-section.png"
import circle from "/images/circle_2.png"

const Advantages = () => {
  const wrapRef = useRef(null)

  useEffect(() => {
    const element = wrapRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible")
        }
      },
      {
        threshold: 0.1, // Секция видна на 10% — запускаю анимацию
        rootMargin: "0px 0px -100px 0px", // Запускать чуть раньше
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <picture>
          <source media="(max-width: 584px)" srcSet={circle} />
          <img src={mascot} alt="mascot" className="img advantages-img" />
        </picture>
        {/*+ Добавляю ref и класс visible */}
        <div ref={wrapRef} className="wrap">
          <h2 className="title">Зачем это и чем удобно?</h2>
          <ul className="wrap__list">
            <li className="text wrap__item">
              <strong>Отчетный прогресс</strong> — сколько серий посмотрел,
              сколько глав прочитал;
            </li>
            <li className="text wrap__item">
              <strong>Делай метки</strong> — ставь метки (любимое,
              просмотрано/прочитано, можно пересмотреть/перечитать и так далее);
            </li>
            <li className="text wrap__item">
              <strong>Следи за количеством</strong> — сколько посмотрел, сколько
              прочёл;
            </li>
            <li className="text wrap__item">
              <strong>Фильтруй</strong> — удобно фильтровать по критериям
              произведения, чтобы быстро найти необходимый тайтл;
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Advantages
