import { useState } from "react"
import { Link } from "react-router-dom"

import "./back_searh_header.css"

const BackSearchHeader = ({ mode, onOpenUnderConstruction }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleClear = () => {
    setSearchQuery("")
  }

  //- При появлении бэка:
  //   // Обработчик ввода
  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     setQuery(value);
  //     if (onSearch) {
  //       onSearch(value); // можно передавать сразу при каждом изменении
  //     }
  //   };

  //   // Очистка поля
  //   const handleClear = () => {
  //     setQuery('');
  //     if (onSearch) {
  //       onSearch(''); // уведомить родителя об очистке
  //     }
  //   };

  return (
    <section className="section-list">
      <div className="container">
        <div className="back-searh-header__wrapper">
          <div className="back-searh-header__navigation">
            <Link to="/profile" className="btn back-searh-header__link">
              <svg
                width="38"
                height="15"
                viewBox="0 0 38 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292892 6.65685C-0.0976296 7.04737 -0.0976295 7.68054 0.292893 8.07106L6.65686 14.435C7.04738 14.8255 7.68054 14.8255 8.07107 14.435C8.46159 14.0445 8.46159 13.4113 8.07107 13.0208L2.41422 7.36396L8.07107 1.7071C8.46159 1.31658 8.46159 0.683412 8.07107 0.292887C7.68054 -0.0976369 7.04738 -0.0976369 6.65685 0.292888L0.292892 6.65685ZM38 7.36395L38 6.36395L1 6.36396L1 7.36396L1 8.36396L38 8.36395L38 7.36395Z"
                  fill={mode ? "var(--accent-text)" : "var(--light-main-text)"}
                />
              </svg>
            </Link>
            <div className="btn back-searh-header__name-list">
              <span>Манга</span>
            </div>
          </div>
          {/* Поиск */}
          {/* <form onSubmit={handleSubmit} className="search-form"> */}
          <form className="back-searh-header__search-form">
            <div className="back-search-header__search">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите название ..."
                className="back-search-header__input"
                aria-label={`Поиск в разделе `} // потом добавишь: ${title} - манга
                onClick={onOpenUnderConstruction} //- ВРЕМЕННО
              />
              <button
                type="button"
                className="back-search-header__clear-btn"
                onClick={handleClear}
                aria-label="Очистить поиск"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={
                    mode ? "var(--accent-text)" : "var(--light-main-text)"
                  }
                >
                  <path d="M0.353516 0.353577L19.8682 19.8682" />
                  <path d="M19.8682 0.760132L0.353516 20.2748" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BackSearchHeader
