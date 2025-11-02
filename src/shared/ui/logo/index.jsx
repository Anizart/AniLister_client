import { Link } from "react-router-dom"
import logo from "/images/svg/logo.svg"
import logo_for_dark from "/images/svg/logo_for_dark.svg"
import mobile_logo from "/images/svg/mobile_logo.svg"
import mobile_logo_for_dark from "/images/svg/mobile_logo_for_dark.svg"

import { useSeasonalTheme } from "../../lib/useSeasonalTheme" // для нового года

const Logo = ({ mode }) => {
  const { isXmas } = useSeasonalTheme() // для нового года

  return (
    <Link to="/" className="header__link-logo">
      <picture>
        <source
          media="(max-width: 558px)"
          srcset={mode ? mobile_logo_for_dark : mobile_logo}
        ></source>
        <img src={mode ? logo_for_dark : logo} alt="logo" height="40" />
      </picture>
      {isXmas ? (
        <img
          src="/images/svg/christmas_tree.svg"
          alt="Christmas tree"
          className="header__christmas-img"
        />
      ) : (
        ""
      )}
    </Link>
  )
}

export default Logo
