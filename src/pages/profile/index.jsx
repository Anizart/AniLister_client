import { useEffect } from 'react'

import UserProfile from './section_profile'
import Groups from './section_groups'

const Profile = ({
  mode,
  onOpenUnderConstruction,
  onOpenCreatingGroup,
  onOpenEditingGroup,
  onDeleteProfile,
  onDeleteGroup,
  onLogout,
}) => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <UserProfile
        onOpenUnderConstruction={onOpenUnderConstruction} //- ВРЕМЕННО
        onDeleteProfile={onDeleteProfile}
        onLogout={onLogout}
      />
      <Groups
        mode={mode}
        onOpenCreatingGroup={onOpenCreatingGroup}
        onOpenEditingGroup={onOpenEditingGroup}
        onDeleteGroup={onDeleteGroup}
      />
    </>
  )
}

export default Profile
