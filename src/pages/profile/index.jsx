import { useEffect } from 'react'

import UserProfile from './section_profile'
import Groups from './section_groups'

const Profile = ({
  mode,
  groups,
  userData,
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
        userData={userData}
        onLogout={onLogout}
        onOpenEditProfile={onOpenEditProfile} //- изменение данных пользователя
        onDeleteProfile={onDeleteProfile}
      />
      <Groups
        mode={mode}
        groups={groups}
        onOpenCreatingGroup={onOpenCreatingGroup}
        onOpenEditingGroup={onOpenEditingGroup}
        onDeleteGroup={onDeleteGroup}
      />
    </>
  )
}

export default Profile
