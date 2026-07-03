import { useEffect } from 'react'

import UserProfile from './section_profile'
import Groups from './section_groups'

const Profile = ({
  mode,
  onOpenUnderConstruction,
  onOpenCreatingGroup,
}) => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <UserProfile
        onOpenUnderConstruction={onOpenUnderConstruction}
      />
      <Groups
        mode={mode}
        onOpenUnderConstruction={onOpenUnderConstruction}
        onOpenCreatingGroup={onOpenCreatingGroup}
      />
    </>
  )
}

export default Profile
