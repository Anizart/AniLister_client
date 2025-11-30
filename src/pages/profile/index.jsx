import { useEffect } from "react"

import UserProfile from "./section_profile"
import Groups from "./section_groups"

const Profile = ({ mode, onOpenModal }) => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <UserProfile onOpenModal={onOpenModal} />
      <Groups mode={mode} />
    </>
  )
}

export default Profile
