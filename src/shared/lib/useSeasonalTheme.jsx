import { useState, useEffect } from "react"

export const useSeasonalTheme = () => {
  const [isXmas, setIsXmas] = useState(false)

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()

    // Период: 15 декабря - 10 января
    const start = new Date(year, 11, 15) // 15 декабря
    const end = new Date(year + 1, 0, 10) // 10 января следующего года

    // Принадлежит ли текущая дата диапазону
    if (now >= start || now <= end) {
      setIsXmas(true)
    }
  }, [])

  return { isXmas }
}
