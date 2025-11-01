import { useState, useEffect } from "react"

export const useSeasonalTheme = () => {
  const [isXmas, setIsXmas] = useState(false)

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()

    // Период: 20 декабря — 10 января
    const start = new Date(year, 11, 20) // 20 декабря
    let end = new Date(year, 0, 10) // 10 января

    // Если сейчас январь, беру предыдущий год
    if (now.getMonth() === 0) {
      end = new Date(year, 0, 10)
    }

    // Проверяю, входит ли сегодняшний день в диапазон
    if (now >= start || now <= end) {
      setIsXmas(true)
    }
  }, [])

  return { isXmas }
}
