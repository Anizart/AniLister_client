import { useState, useEffect, useCallback } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Header from './shared/widgets/header'
import Footer from './shared/widgets/footer'
import NotfoundPage from './pages/notfound-page-404'
import Profile from './pages/profile'
import PrivacyPolicy from './pages/legal/privacy_policy'
import TermsOfService from './pages/legal/terms_of_service'
//+ Modals:
import UnderConstructionModal from './shared/ui/modals/under_construction_modal'
import ModalSignUp from './shared/ui/modals/auth_modals/modal_sign_up'
import ModalAuthentication from './shared/ui/modals/auth_modals/modal_authentication'
import ModalCreatingGroup from './shared/ui/modals/creating_group'
import ConfirmModal from './shared/ui/modals/confirm_modal'
import ModalEditProfile from './shared/ui/modals/modal_edit_profile'
import AddingCard from './shared/ui/modals/adding_card'
//+ Пользователь:
import {
  getCurrentUser,
  logoutUser,
  deleteUser,
  getUserGroups,
  saveGroup,
  deleteGroup,
  saveCardToGroup,
  deleteCardFromGroup,
} from '/api/auth.js'
//+ Компонент для перенаправления авторизованных пользователей с главной:
import MainRedirect from './shared/lib/main_redirect'
//+ Компонент-защитник (проверяет наличие пользователя)
import ProtectedRoute from './shared/lib/protected_route'
//+ Компонент-обёртка для list:
import ListWrapper from './shared/lib/list_wrapper_for_id'
//+ Toast:
import Toast from './shared/ui/toast'

function App() {
  //+ Тема
  const [mode, setMode] = useState(false)
  const [isManualToggle, setIsManualToggle] =
    useState(false) // флаг: if пользователь менял тему

  // Функция установки темы
  const setTheme = (newMode, manual = false) => {
    setMode(newMode)
    if (manual) {
      setIsManualToggle(true)
    }
    localStorage.setItem('mode', JSON.stringify(newMode))
  }

  useEffect(() => {
    // Проверяю, есть ли сохранённый выбор
    const saved = localStorage.getItem('mode')
    if (saved !== null) {
      setMode(JSON.parse(saved))
      setIsManualToggle(true)
    } else {
      // Если нет смотрю системную тему
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      setMode(systemPrefersDark) // НЕ устанавливаю isManualToggle — остаётся false
    }
  }, [])

  // Применяю тему к body
  useEffect(() => {
    document.body.classList.toggle('dark', mode)
  }, [mode])

  // Отслеживание системной темы, если пользователь НЕ делал ручной выбор
  useEffect(() => {
    if (isManualToggle) return // если пользователь сам выбрал, не меняю автоматически

    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )
    const handleChange = (e) => {
      setMode(e.matches)
    }

    // Современный способ
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () =>
        mediaQuery.removeEventListener(
          'change',
          handleChange,
        )
    } else {
      // Устаревший способ (для Safari < 14 и др.)
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [isManualToggle])

  const handleToggleMode = () => {
    setTheme(!mode, true)
  }
  //+ /Тема

  //+ Modals
  const [
    isUnderConstructionOpen,
    setIsUnderConstructionOpen,
  ] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isAuthenticationOpen, setIsAuthenticationOpen] =
    useState(false)
  const [isCreatingGroupOpen, setIsCreatingGroupOpen] =
    useState(false)
  // Состояние для карточки
  const [isAddingCardOpen, setIsAddingCardOpen] =
    useState(false)
  const [editingCard, setEditingCard] = useState(null)
  // Состояние для данных группы
  const [editingGroup, setEditingGroup] = useState(null)
  // Модалки удаления и выхода
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    warningText: '',
    onConfirm: () => {},
    dangerMode: true,
  })
  // Модалка изменения профиля
  // Состояние для данных редактирования профиля
  const [editProfileData, setEditProfileData] =
    useState(null)
  // Groups State
  const [groups, setGroups] = useState([])

  //+ Выход из модалки по нажатию на Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsUnderConstructionOpen(false)
        setIsSignUpOpen(false)
        setIsAuthenticationOpen(false)
        setIsCreatingGroupOpen(false)
        setConfirmModal((prev) => ({
          ...prev,
          isOpen: false,
        }))
        setEditProfileData(null)
        setIsAddingCardOpen(false)
        //- СЮДА ДРУГИЕ МОДАЛКИ
      }
    }

    if (
      isUnderConstructionOpen ||
      isSignUpOpen ||
      isAuthenticationOpen ||
      isCreatingGroupOpen ||
      confirmModal ||
      editProfileData ||
      isAddingCardOpen
      //- СЮДА ДРУГИЕ МОДАЛКИ
    ) {
      document.addEventListener('keydown', handleKeyDown)
      return () =>
        document.removeEventListener(
          'keydown',
          handleKeyDown,
        )
    }
  }, [
    isUnderConstructionOpen,
    isSignUpOpen,
    isAuthenticationOpen,
    isCreatingGroupOpen,
    confirmModal,
    editProfileData,
    isAddingCardOpen,
  ])

  //+ Group
  // Функция открытия в режиме создания
  const handleOpenCreate = () => {
    setEditingGroup(null)
    setIsCreatingGroupOpen(true)
  }
  // Функция открытия в режиме редактирования
  const handleOpenEdit = (group) => {
    setEditingGroup(group)
    setIsCreatingGroupOpen(true)
  }
  // При закрытии очистка данных
  const handleCloseGroupModal = () => {
    setIsCreatingGroupOpen(false)
    setEditingGroup(null)
  }
  //+ /Group

  //+ confirmModal
  const openConfirm = (config) => {
    setConfirmModal({ ...config, isOpen: true })
  }

  const closeConfirm = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }))
  }

  //+ /confirmModal

  //+ modal_edit_profile
  const openEditProfile = () => {
    if (currentUser) {
      setEditProfileData(currentUser)
    }
  }

  const closeEditProfile = () => setEditProfileData(null)
  //+ /modal_edit_profile

  //+ Открытие входа при возращении не зареганого пользователя на гланую
  const handleOpenAuthFromRedirect = useCallback(() => {
    setIsAuthenticationOpen(true)
  }, [])

  //+ /Modals

  //+ Пользователь
  const [currentUser, setCurrentUser] = useState(null)

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  // Функция обновления пользователя после входа/регистрации
  const handleAuthSuccess = (message) => {
    const user = getCurrentUser()
    setCurrentUser(user)
    showToast(message || 'Вы успешно вошли!')
  }

  // Функция выхода (confirmModal)
  const handleLogout = () => {
    openConfirm({
      title: 'Выход',
      message: 'Вы действительно хотите выйти с аккаунта?',
      onConfirm: () => {
        logoutUser()
        setCurrentUser(null)
        showToast('Возращайтесь скорее!')
      },
    })
  }

  // Функция обновления профиля (confirmModal)
  const handleProfileUpdate = () => {
    const user = getCurrentUser()
    setCurrentUser(user)
    showToast('Профиль успешно обновлен!')
  }

  // Удаление профиля (confirmModal)
  const handleDeleteProfile = () => {
    openConfirm({
      title: 'Удаление профиля',
      warningText: 'Внимание! Это действие необратимо!',
      message:
        'Вы действительно хотите удалить свой аккаунт? Все ваши данные и списки будут безвозвратно утеряны!',
      onConfirm: () => {
        deleteUser() // Удаляю из LocalStorage
        setCurrentUser(null) // Очищаю состояние в React
        showToast(
          'Аккаунт успешно удален. Жаль с Вами прощаться ಥ_ಥ',
          5000,
        )
      },
    })
  }

  //+ Работа с группами:
  // Загружаем группы при старте
  useEffect(() => {
    if (currentUser) {
      setGroups(getUserGroups())
    }
  }, [currentUser])

  // Обработчик сохранения группы из модалки
  const handleSaveGroup = (groupData) => {
    const updatedGroups = saveGroup(groupData)
    setGroups(updatedGroups)
    showToast(
      groupData.id
        ? 'Группа обновлена!'
        : 'Группа создана!',
    )
  }

  // Обработчик удаления группы (confirmModal)
  const handleDeleteGroup = (groupId) => {
    openConfirm({
      title: 'Удаление',
      warningText: 'Внимание, это действие необратимо!',
      message:
        'Удаляя группу, Вы удаляете всё её содержимое. Вы действительно хотите удалить?',
      onConfirm: () => {
        const updatedGroups = deleteGroup(groupId)
        setGroups(updatedGroups)
        showToast('Группа удалена')
      },
    })
  }

  //+ Работа с карточками:
  const [
    addingCardDefaultTopic,
    setAddingCardDefaultTopic,
  ] = useState('read')
  const [currentGroupId, setCurrentGroupId] = useState(null)

  // Функция открытия на создание
  const handleOpenAddCard = (groupId, topic = 'read') => {
    setCurrentGroupId(groupId) // Сохр. ID группы
    setAddingCardDefaultTopic(topic) // Сохр. тему группы
    setEditingCard(null)
    setIsAddingCardOpen(true)
  }

  // Сохранение карточки из модалки
  const handleSaveCard = (cardData, groupId) => {
    const updatedGroups = saveCardToGroup(groupId, cardData)
    setGroups(updatedGroups)
    showToast(
      cardData.id
        ? 'Карточка обновлена!'
        : 'Карточка добавлена!',
    )
  }

  // Удаление карточки (confirmModal)
  const handleDeleteCard = (cardId, groupId) => {
    openConfirm({
      title: 'Удаление',
      warningText: 'Внимание это действие не обратимо!',
      message: 'Вы действительно хотите удалить?',
      onConfirm: () => {
        const updatedGroups = deleteCardFromGroup(
          groupId,
          cardId,
        )
        setGroups(updatedGroups)
        showToast('Карточка удалена')
      },
    })
  }

  //+ editingCard
  // Функция открытия на редактирование
  const handleOpenEditCard = (card, groupId) => {
    setCurrentGroupId(groupId)
    setEditingCard(card)
    setIsAddingCardOpen(true)
  }

  // Функция закрытия (универсальная)
  const handleCloseAddingCard = () => {
    setIsAddingCardOpen(false)
    setEditingCard(null) // Очищаем данные при закрытии
  }
  //+ /editingCard
  //+ /Пользователь

  //+ Toast:
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    duration: 3000,
  })

  // Функция для показа уведомления
  const showToast = (message, duration = 3000) => {
    setToast({ isOpen: true, message, duration })
  }

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }))
  }
  //+ /Toast

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header
          mode={mode}
          onToggleMode={handleToggleMode}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenAuthentication={() =>
            setIsAuthenticationOpen(true)
          }
          currentUser={currentUser}
          onAuthSuccess={handleAuthSuccess}
        />
        <main className='main'>
          <Routes>
            <Route
              path='/'
              element={
                <MainRedirect
                  currentUser={currentUser}
                  onOpenAuthentication={() =>
                    setIsAuthenticationOpen(true)
                  }
                  openAuthModal={handleOpenAuthFromRedirect}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Profile
                    mode={mode}
                    userData={currentUser}
                    onLogout={handleLogout}
                    onOpenEditProfile={openEditProfile}
                    onDeleteProfile={handleDeleteProfile}
                    groups={groups}
                    onOpenCreatingGroup={handleOpenCreate}
                    onOpenEditingGroup={handleOpenEdit}
                    onDeleteGroup={handleDeleteGroup}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/list/:groupId'
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <ListWrapper
                    mode={mode}
                    groups={groups}
                    onSaveCard={handleSaveCard}
                    onDeleteCard={handleDeleteCard}
                    onOpenAddCard={handleOpenAddCard}
                    onOpenEditCard={handleOpenEditCard}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/privacy-policy'
              element={<PrivacyPolicy />}
            />
            <Route
              path='/terms-of-service'
              element={<TermsOfService />}
            />
            <Route
              path='*'
              element={<NotfoundPage />}
            />
          </Routes>
        </main>
        <Footer
          mode={mode}
          currentUser={currentUser}
        />
        {/* Modals: */}
        <UnderConstructionModal
          isOpen={isUnderConstructionOpen}
          onClose={() => setIsUnderConstructionOpen(false)}
          mode={mode}
        />
        <ModalSignUp
          mode={mode}
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          onOpenAuthentication={() =>
            setIsAuthenticationOpen(true)
          }
          onAuthSuccess={handleAuthSuccess}
          showToast={showToast}
        />
        <ModalAuthentication
          mode={mode}
          isOpen={isAuthenticationOpen}
          onClose={() => setIsAuthenticationOpen(false)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onAuthSuccess={handleAuthSuccess}
          showToast={showToast}
        />
        <ModalCreatingGroup
          mode={mode}
          groupData={editingGroup} // Передаю данные или null
          onSave={handleSaveGroup}
          isOpen={isCreatingGroupOpen}
          onClose={handleCloseGroupModal}
        />
        <ConfirmModal
          mode={mode}
          isOpen={confirmModal.isOpen}
          onClose={closeConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          warningText={confirmModal.warningText}
          dangerMode={confirmModal.dangerMode}
          onConfirm={confirmModal.onConfirm}
        />
        <ModalEditProfile
          mode={mode}
          showToast={showToast}
          isOpen={!!editProfileData}
          onClose={closeEditProfile}
          initialData={editProfileData}
          onProfileUpdated={handleProfileUpdate}
        />
        <AddingCard
          mode={mode}
          isOpen={isAddingCardOpen}
          onClose={handleCloseAddingCard}
          onSave={handleSaveCard}
          groupId={currentGroupId}
          defaultTopic={addingCardDefaultTopic} // Тема группы для лейблов
          cardData={editingCard} // Передаю null или объект карточки
        />
        <Toast
          mode={mode}
          message={toast.message}
          isOpen={toast.isOpen}
          onClose={closeToast}
          duration={toast.duration}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
