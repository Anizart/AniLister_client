import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ currentUser, children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!currentUser) {
      // Перенаправляем на главную с флагом в state
      navigate('/', {
        replace: true,
        state: {
          from: location.pathname,
          reason: 'auth_required',
        },
      })
    }
  }, [currentUser, navigate, location])

  if (!currentUser) {
    return null
  }

  return children
}

export default ProtectedRoute
