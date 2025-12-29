import { useEffect } from "react"

import Welcome from "./section_welcome/welcome"
import Advantages from "./section_advantages/advantages"
import Entice from "./section_entice/entice"

const MainPage = () => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Welcome />
      <Advantages />
      <Entice />
    </>
  )
}

export default MainPage
