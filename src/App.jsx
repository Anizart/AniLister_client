import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./shared/widgets/header"
import MainPage from "./pages/main"
import Footer from "./shared/widgets/footer"
// import { NotFoundPage } from "./pages/notfound-page-404"

function App() {
  //+ Тема
  const [mode, setMode] = useState(false)
  const [isManualToggle, setIsManualToggle] = useState(false) // флаг: if пользователь менял тему

  // Функция установки темы (сохраняет в localStorage и обновляет состояние)
  const setTheme = (newMode, manual = false) => {
    setMode(newMode)
    if (manual) {
      setIsManualToggle(true)
    }
    localStorage.setItem("mode", JSON.stringify(newMode))
  }

  useEffect(() => {
    // Проверяю, есть ли сохранённый выбор
    const saved = localStorage.getItem("mode")
    if (saved !== null) {
      setMode(JSON.parse(saved))
      setIsManualToggle(true)
    } else {
      // Если нет смотрю системную тему
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      setMode(systemPrefersDark) // НЕ устанавливаю isManualToggle — остаётся false
    }
  }, [])

  // Применяю тему к body
  useEffect(() => {
    document.body.classList.toggle("dark", mode)
  }, [mode])

  // Отслеживание системной темы, если пользователь НЕ делал ручной выбор
  useEffect(() => {
    if (isManualToggle) return // если пользователь сам выбрал, не меняю автоматически

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      setMode(e.matches)
    }

    // Современный способ
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // Устаревший способ (для Safari < 14 и др.)
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [isManualToggle])

  const handleToggleMode = () => {
    setTheme(!mode, true)
  }
  //+ Тема/

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header mode={mode} onToggleMode={handleToggleMode} />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer mode={mode} />
      </div>
    </BrowserRouter>
  )
}

export default App
