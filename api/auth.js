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

// Выход из аккаунта
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Проверить, авторизован ли пользователь
export const isAuthenticated = () => {
  return !!getCurrentUser()
}
