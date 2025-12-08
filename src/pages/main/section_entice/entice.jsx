import { useEffect, useRef } from "react"

import "./entice.css"

import mascot from "/images/mascot_entice-section.png"
import circle from "/images/circle_3.png"

const Entice = ({ onOpenUnderConstruction }) => {
  const descriptionWrap = useRef(null)
  const questionWrap = useRef(null)

  useEffect(() => {
    const descriptionElem = descriptionWrap.current
    const questionElem = questionWrap.current

    if (!descriptionElem || !questionElem) return

    const observe = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          descriptionElem.classList.add("visible")
          questionElem.classList.add("visible")
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    //+ Передаю .current (DOM-элементы)
    observe.observe(descriptionElem)
    observe.observe(questionElem)

    return () => {
      //+ Убираю наблюдение за .current
      observe.unobserve(descriptionElem)
      observe.unobserve(questionElem)
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <picture>
          <source media="(max-width: 485px)" srcSet={circle} />
          <img src={mascot} alt="mascot" className="img entice-img" />
        </picture>
        <div className="entice__wrapper">
          <div ref={descriptionWrap} className="entice__description">
            <h2 className="title entice__title">Всё в одном месте.</h2>
            <div className="text entice__text">
              Аниме. Манга. Книги. Прогресс.
              <br />
              Каждая серия — воспоминание.
              <br />
              Каждая глава — приключение.
              <br />
              Сохрани их с AniLister.
            </div>
          </div>
          <div ref={questionWrap} className="entice__question">
            <h2 className="title entice__title">Ну что?</h2>
            <div className="text question__text">Начнём?</div>
            <button
              type="button"
              className="btn"
              onClick={onOpenUnderConstruction}
            >
              Начать список
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Entice
