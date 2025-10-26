import logo from "/images/svg/logo.svg"
import "./header.css"

const Header = ({ mode, onToggleMode }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <img src={logo} alt="logo" />
          <div className="header__wrapper-elem">
            <div
              className={`header__toggle-container ${
                mode ? "toggle-container-bg" : ""
              }`}
              id="toggle-dark-mode"
              onClick={() => onToggleMode(!mode)}
            >
              <div
                className={`header__circle ${mode ? "circle-transform" : ""}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
