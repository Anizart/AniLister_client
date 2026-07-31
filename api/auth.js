const USERS_KEY = 'anilister_users'
const CURRENT_USER_KEY = 'anilister_current_user'

// Получить всех пользователей из LocalStorage
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

// Сохранить всех пользователей
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Регистрация пользователя
export const registerUser = (userData) => {
  const users = getUsers()

  // Проверяем, есть ли уже пользователь с таким email
  const existingUser = users.find(
    (u) => u.email === userData.email,
  )
  if (existingUser) {
    throw new Error(
      'Пользователь с таким email уже существует',
    )
  }

  // Создаю нового пользователя
  const newUser = {
    id: Date.now().toString(), // временный ID
    name: userData.name,
    email: userData.email,
    password: userData.password, // потом пароль хешировать!
    avatarUrl: '/images/svg/default_image.svg',
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  // Автоматический вход после регистрации
  setCurrentUser(newUser)

  return { success: true, user: newUser }
}

// Вход пользователя
export const loginUser = (credentials) => {
  const users = getUsers()

  const user = users.find(
    (u) =>
      u.email === credentials.email &&
      u.password === credentials.password,
  )

  if (!user) {
    throw new Error('Неверный email или пароль')
  }

  setCurrentUser(user)

  return { success: true, user }
}

// Обновление профиля пользователя
export const updateUserProfile = (updatedData) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Обновление данных текущего пользователя
  const updatedUser = { ...currentUser, ...updatedData }

  // Сохраняю как текущего
  setCurrentUser(updatedUser)

  // Находим и обновляем пользователя в общем списке users
  const users = getUsers()
  const userIndex = users.findIndex(
    (u) => u.id === currentUser.id,
  )

  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    saveUsers(users)
  }

  return updatedUser
}

// Получить текущего пользователя
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

// Установить текущего пользователя
export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(user),
    )
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Проверить, авторизован ли пользователь
export const isAuthenticated = () => {
  return !!getCurrentUser()
}

// Выход из аккаунта
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

//- Удаление аккаунта пользователя (ДОДЕЛАТЬ ЧТОБ И ВСЕ КАРТОЧКИ И Т.Д. УДАЛЯЛОСЬ (КАСКАДОМ))
export const deleteUser = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  // Фильтр списока: оставляя всех, кроме текущего пользователя
  const updatedUsers = users.filter(
    (u) => u.id !== currentUser.id,
  )

  saveUsers(updatedUsers)
  logoutUser() // Удаляю запись о текущей сессии

  return true
}

//+ Работа с группами:
// Получить группы текущего пользователя
export const getUserGroups = () => {
  const user = getCurrentUser()
  return user?.groups || []
}

// Сохранить группы текущему пользователю
const saveUserGroups = (groups) => {
  const user = getCurrentUser()
  if (!user) return

  const updatedUser = { ...user, groups }
  setCurrentUser(updatedUser)

  // Также обновляем в общем списке users
  const users = getUsers()
  const index = users.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    users[index] = updatedUser
    saveUsers(users)
  }
}

// Создание или обновление группы
export const saveGroup = (groupData) => {
  const groups = getUserGroups()

  if (groupData.id) {
    // Редактирование
    const index = groups.findIndex(
      (g) => g.id === groupData.id,
    )
    if (index !== -1) {
      groups[index] = {
        ...groups[index],
        title: groupData.title,
      }
    }
  } else {
    // Создание новой
    const newGroup = {
      id: Date.now().toString(),
      title: groupData.title,
      topic: groupData.topic, // 'watch' или 'read'
      cards: [], // Массив для будущих карточек
    }
    groups.push(newGroup)
  }

  saveUserGroups(groups)
  return groups
}

// Удаление группы
export const deleteGroup = (groupId) => {
  let groups = getUserGroups()
  groups = groups.filter((g) => g.id !== groupId)
  saveUserGroups(groups)
  return groups
}
