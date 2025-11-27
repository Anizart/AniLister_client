import Welcome from "./section_welcome/welcome"
import Advantages from "./section_advantages/advantages"
import Entice from "./section_entice/entice"

const MainPage = ({ isModalOpen, onOpenModal }) => {
  return (
    <>
      <Welcome isModalOpen={isModalOpen} onOpenModal={onOpenModal} />
      <Advantages />
      <Entice isModalOpen={isModalOpen} onOpenModal={onOpenModal} />
    </>
  )
}

export default MainPage
