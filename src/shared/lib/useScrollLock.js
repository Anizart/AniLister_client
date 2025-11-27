import { useEffect } from "react"

export const useScrollLock = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return

    // Ширина скроллбара
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    // Исходный padding-right
    const originalPadding = document.body.style.paddingRight || ""

    // Добавляю padding, чтобы компенсировать исчезновение скролла
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = "hidden"

    // При закрытии возвращаю всё как было
    return () => {
      document.body.style.paddingRight = originalPadding
      document.body.style.overflow = ""
    }
  }, [isOpen])
}
