import { useEffect } from 'react'

import UserProfile from './section_profile'
import Groups from './section_groups'

const Profile = ({
  mode,
  onOpenCreatingGroup,
  onOpenEditingGroup,
  onOpenEditProfile, //- изменение данных пользователя
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
        onOpenEditProfile={onOpenEditProfile} //- изменение данных пользователя
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
