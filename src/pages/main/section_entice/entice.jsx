import "./entice.css"

import mascot from "/images/mascot_entice-section.png"

const Entice = () => {
  return (
    <section className="section">
      <div className="container">
        <img src={mascot} alt="mascot" className="entice-img" />
        <div className="entice__wrapper">
          <div className="entice__description">
            <h2 className="title entice__title">Всё в одном месте.</h2>
            <div className="text">
              Аниме. Манга. Книги. Прогресс.
              <br />
              Каждая серия — воспоминание.
              <br />
              Каждая глава — приключение.
              <br />
              Сохрани их с AniLister.
            </div>
          </div>
          <div className="entice__question">
            <h2 className="title">Ну что?</h2>
            <div className="text">Начнём?</div>
            <button className="btn">Начать список</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Entice
