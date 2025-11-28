import { useEffect } from "react"

import UserProfile from "./section_profile"

const Profile = () => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <UserProfile />
    </>
  )
}

export default Profile
