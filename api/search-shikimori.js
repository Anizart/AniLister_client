export default async function handler(req, res) {
  // Разрешаем CORS только для твоего домена
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { query } = req.query

  if (!query || query.length < 2) {
    return res
      .status(400)
      .json({ error: 'Минимум 2 символа' })
  }

  try {
    const encodedQuery = encodeURIComponent(query)

    // Параллельный запрос к аниме и манге
    const [animeRes, mangaRes] = await Promise.all([
      fetch(
        `https://shikimori.io/api/animes?search=${encodedQuery}&limit=3`,
      ),
      fetch(
        `https://shikimori.io/api/mangas?search=${encodedQuery}&limit=3`,
      ),
    ])

    // Проверяем, что ответы успешные
    if (!animeRes.ok || !mangaRes.ok) {
      throw new Error('Ошибка ответа от Shikimori')
    }

    const animeData = await animeRes.json()
    const mangaData = await mangaRes.json()

    // Объединяем результаты
    const combined = [
      ...animeData.map((item) => ({
        ...item,
        kind: item.kind || 'tv',
        contentType: 'anime',
      })),
      ...mangaData.map((item) => ({
        ...item,
        kind: item.kind || 'manga',
        contentType: 'manga',
      })),
    ]

    // Сортируем по рейтингу и берём топ-5
    const sorted = combined
      .filter((item) => item.score !== null)
      .sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score),
      )
      .slice(0, 5)

    return res.status(200).json(sorted)
  } catch (error) {
    console.error('Shikimori API Error:', error)
    return res.status(500).json({ error: 'Ошибка поиска' })
  }
}
