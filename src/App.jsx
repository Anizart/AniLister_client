import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./shared/widgets/header"
import MainPage from "./pages/main"
import Footer from "./shared/widgets/footer"
import NotfoundPage from "./pages/notfound-page-404"
import Profile from "./pages/profile"
import UnderConstructionModal from "./shared/ui/modals/under_construction_modal"
import PrivacyPolicy from "./pages/legal/privacy_policy"
import TermsOfService from "./pages/legal/terms_of_service"

function App() {
  //+ Тема
  const [mode, setMode] = useState(false)
  const [isManualToggle, setIsManualToggle] = useState(false) // флаг: if пользователь менял тему

  // Функция установки темы
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
  //+ /Тема

  //+ Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  //+ /Modals

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header
          mode={mode}
          onToggleMode={handleToggleMode}
          isModalOpen={isModalOpen}
          onOpenModal={() => setIsModalOpen(true)}
        />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  isModalOpen={isModalOpen}
                  onOpenModal={() => setIsModalOpen(true)}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile mode={mode} onOpenModal={() => setIsModalOpen(true)} />
              }
            />
            <Route path="*" element={<NotfoundPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer mode={mode} />
        {/* Modals: */}
        <UnderConstructionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={mode}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
