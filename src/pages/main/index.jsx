import { useEffect } from "react"

import Welcome from "./section_welcome/welcome"
import Advantages from "./section_advantages/advantages"
import Entice from "./section_entice/entice"

const MainPage = ({ isModalOpen, onOpenModal }) => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Welcome isModalOpen={isModalOpen} onOpenModal={onOpenModal} />
      <Advantages />
      <Entice isModalOpen={isModalOpen} onOpenModal={onOpenModal} />
    </>
  )
}

export default MainPage
