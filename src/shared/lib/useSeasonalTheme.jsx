import { useState, useEffect } from "react"

export const useSeasonalTheme = () => {
  const [isXmas, setIsXmas] = useState(false)

  useEffect(() => {
    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()

    const isInDec = month === 11 && day >= 15 // 15...31 декабря
    const isInJan = month === 0 && day <= 10 // 1...10 января

    setIsXmas(isInDec || isInJan)
  }, [])

  return { isXmas }
}
