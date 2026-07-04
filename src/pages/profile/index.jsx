import { useEffect } from 'react'

import UserProfile from './section_profile'
import Groups from './section_groups'

const Profile = ({
  mode,
  onOpenUnderConstruction,
  onOpenCreatingGroup,
  onOpenEditingGroup,
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
        onOpenUnderConstruction={onOpenUnderConstruction} //- ВРЕМЕННО
        onOpenCreatingGroup={onOpenCreatingGroup}
        onOpenEditingGroup={onOpenEditingGroup}
      />
    </>
  )
}

export default Profile
