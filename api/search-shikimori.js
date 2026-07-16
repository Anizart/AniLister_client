export default async function handler(req, res) {
  const { query } = req.query

  if (!query || query.length < 2) {
    return res.status(400).json({
      error: 'Запрос должен быть минимум 2 символа',
    })
  }

  try {
    const encodedQuery = encodeURIComponent(query)

    // Запрашиваем аниме и мангу параллельно
    const [animeRes, mangaRes] = await Promise.all([
      fetch(
        `https://shikimori.io/api/animes?search=${encodedQuery}&limit=3`,
      ),
      fetch(
        `https://shikimori.io/api/mangas?search=${encodedQuery}&limit=3`,
      ),
    ])

    const animeData = await animeRes.json()
    const mangaData = await mangaRes.json()

    // Объединяем, добавляем тип и сортируем по рейтингу
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

    const sorted = combined
      .filter((item) => item.score !== null)
      .sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score),
      )
      .slice(0, 5)

    return res.status(200).json(sorted)
  } catch (error) {
    console.error('Ошибка прокси Shikimori:', error)
    return res.status(500).json({ error: 'Ошибка поиска' })
  }
}
