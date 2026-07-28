import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MainPage from '../../../pages/main'

const MainRedirect = ({
  currentUser,
  openAuthModal,
  onOpenAuthentication,
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Редирект авторизованных
    if (currentUser) {
      navigate('/profile', { replace: true })
      return
    }

    // Открытие модалки только если есть метка и она еще не обработана
    if (location.state?.reason === 'auth_required') {
      openAuthModal()
      // Очистка state, чтобы не открывать повторно
      window.history.replaceState({}, document.title)
    }
  }, [currentUser, navigate, location.state, openAuthModal])
  // Зависимость именно от location.state, а не от всего location

  return (
    <MainPage onOpenAuthentication={onOpenAuthentication} />
  )
}

export default MainRedirect
