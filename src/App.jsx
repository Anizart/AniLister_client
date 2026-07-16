import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Header from './shared/widgets/header'
import MainPage from './pages/main'
import Footer from './shared/widgets/footer'
import NotfoundPage from './pages/notfound-page-404'
import Profile from './pages/profile'
import PrivacyPolicy from './pages/legal/privacy_policy'
import TermsOfService from './pages/legal/terms_of_service'
//+ Modals:
import UnderConstructionModal from './shared/ui/modals/under_construction_modal'
import ModalSignUp from './shared/ui/modals/auth_modals/modal_sign_up'
import ModalAuthentication from './shared/ui/modals/auth_modals/modal_authentication'
import List from './pages/list'
import ModalCreatingGroup from './shared/ui/modals/creating_group'
import ConfirmModal from './shared/ui/modals/confirm_modal'
import ModalEditProfile from './shared/ui/modals/modal_edit_profile'
import AddingCard from './shared/ui/modals/adding_card'
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
  //- Временные данные для тестирования модалки: modal_edit_profile
  const MOCK_USER_DATA = {
    id: 'user-1',
    name: 'test',
    avatarUrl: '/images/svg/default_image.svg',
  }
  const [editProfileData, setEditProfileData] =
    useState(null)
  //- Временные данные для тестирования модалки: modal_edit_profile
  const MOCK_CARDS = [
    {
      id: 'card-1',
      title:
        'Я распродал свою жизнь. По десять тысяч иен за год.',
      volume: '3',
      chapter: '16.5',
      page: '48',
      startDate: '08.08.2024',
      endDate: '28.08.2024',
      image: '/images/delete.jpg',
      tags: ['all', 'favorites', 'to-read'],
      // Данные для маркировки
      marks: {
        hasNote: true, // Иконка заметки/свитка
        hasLike: true, // Иконка сердца
        hasEye: true, // Иконка глаза (просмотрено/внимание)
      },
    },
    {
      id: 'card-2',
      title: 'Название второй карточки',
      volume: '1',
      chapter: '5',
      page: '12',
      startDate: '01.09.24',
      endDate: '-',
      image: '/images/default.jpg',
      tags: ['all'],
      marks: {
        hasNote: true,
        hasLike: false,
        hasEye: false,
      },
    },
    {
      id: 'card-3',
      title: 'Что-то',
      volume: '3',
      chapter: '16.5',
      page: '48',
      startDate: '08.08.24',
      endDate: '28.08.24',
      image: '/images/default.jpg',
      tags: ['all', 'liked'],
      marks: {
        hasNote: true,
        hasLike: true,
        hasEye: false,
      },
    },
  ]

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

  // Сценарии использования:
  // Удаление группы:
  const handleDeleteGroup = (groupId) => {
    openConfirm({
      title: 'Удаление',
      warningText: 'Внимание это действие не обратимо!',
      message:
        'Удаляя группу, Вы удаляете всё содержимое. Вы действительно хотите удалить?',
      onConfirm: () =>
        console.log('Группа удалена:', groupId),
    })
  }
  //! Удаление карточки:
  const handleDeleteCard = (cardId) => {
    openConfirm({
      title: 'Удаление',
      warningText: 'Внимание это действие не обратимо!',
      message: 'Вы действительно хотите удалить?',
      onConfirm: () =>
        console.log('Карточка удалена:', cardId),
    })
  }

  // Выход из аккаунта:
  const handleLogout = () => {
    openConfirm({
      title: 'Выход',
      message: 'Вы действительно хотите выйти с аккаунта?',
      onConfirm: () => console.log('Логаут...'),
    })
  }

  // Удаление профиля:
  const handleDeleteProfile = () => {
    openConfirm({
      title: 'Удаление профиля',
      message:
        'Вы действительно хотите удалить свой аккаунт? После удаления аккаунт не подлежит восстановлению!',
      onConfirm: () => console.log('Профиль удален'),
    })
  }
  //+ /confirmModal

  //+ modal_edit_profile
  const openEditProfile = () =>
    setEditProfileData(MOCK_USER_DATA)

  const closeEditProfile = () => setEditProfileData(null)
  //+ /modal_edit_profile

  //+ editingCard
  // 2. Функция открытия на создание
  const handleOpenAddCard = () => {
    setEditingCard(null) // Сбрасываем данные редактирования
    setIsAddingCardOpen(true) // Открываем модалку
  }

  // 3. Функция открытия на редактирование
  const handleOpenEditCard = (card) => {
    setEditingCard(card) // Заполняем данными
    setIsAddingCardOpen(true) // Открываем модалку
  }

  // 4. Функция закрытия (универсальная)
  const handleCloseAddingCard = () => {
    setIsAddingCardOpen(false)
    setEditingCard(null) // Очищаем данные при закрытии
  }
  //+ /editingCard

  //+ /Modals

  //+ Toast:

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
        />
        <main className='main'>
          <Routes>
            <Route
              path='/'
              element={<MainPage />}
            />
            <Route
              path='/profile'
              element={
                <Profile
                  mode={mode}
                  onOpenEditProfile={openEditProfile} //- Временные данные для теста модалки: modal_edit_profile
                  onOpenCreatingGroup={handleOpenCreate}
                  onOpenEditingGroup={handleOpenEdit}
                  onLogout={handleLogout}
                  onDeleteGroup={handleDeleteGroup}
                  onDeleteProfile={handleDeleteProfile}
                />
              }
            />
            <Route
              path='list'
              //- list/:groupId - так когда появится бэк
              element={
                <List
                  mode={mode}
                  onOpenUnderConstruction={() =>
                    setIsUnderConstructionOpen(true)
                  }
                  cardsData={MOCK_CARDS}
                  onDeleteCard={handleDeleteCard}
                  onOpenAddCard={handleOpenAddCard}
                  onOpenEditCard={handleOpenEditCard}
                />
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
        <Footer mode={mode} />
        {/* Modals: */}
        <UnderConstructionModal
          isOpen={isUnderConstructionOpen}
          onClose={() => setIsUnderConstructionOpen(false)}
          mode={mode}
        />
        <ModalSignUp
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          onOpenAuthentication={() =>
            setIsAuthenticationOpen(true)
          }
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
          mode={mode}
        />
        <ModalAuthentication
          isOpen={isAuthenticationOpen}
          onClose={() => setIsAuthenticationOpen(false)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
          mode={mode}
        />
        <ModalCreatingGroup
          isOpen={isCreatingGroupOpen}
          onClose={handleCloseGroupModal}
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
          mode={mode}
          groupData={editingGroup} // Передаю данные или null
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
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
        />
        <ModalEditProfile
          mode={mode}
          isOpen={!!editProfileData}
          onClose={closeEditProfile}
          initialData={editProfileData}
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
        />
        <AddingCard
          mode={mode}
          isOpen={isAddingCardOpen}
          onClose={handleCloseAddingCard}
          onOpenUnderConstruction={() =>
            setIsUnderConstructionOpen(true)
          } //- ВРЕМЕННО
          cardData={editingCard} // Передаю null или объект карточки
        />
        {/* Toast: */}
        {/* <Toast mode={mode} /> */}
      </div>
    </BrowserRouter>
  )
}

export default App
