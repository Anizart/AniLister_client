export const config = {
  api: {
    bodyParser: false, // Отключаем парсер тела для бинарных данных
  },
}

export default async function handler(req, res) {
  // Разрешаем только GET-запросы
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Метод не разрешён' })
  }

  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res
      .status(400)
      .json({ error: 'Не указан URL изображения' })
  }

  // Безопасность: разрешаем только shikimori.io
  if (!url.startsWith('https://shikimori.io')) {
    return res
      .status(403)
      .json({
        error: 'Доступ разрешён только к shikimori.io',
      })
  }

  try {
    const imageRes = await fetch(url)

    if (!imageRes.ok) {
      return res.status(imageRes.status).end()
    }

    const contentType =
      imageRes.headers.get('content-type') || 'image/jpeg'
    const buffer = await imageRes.arrayBuffer()

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400')

    return res.send(buffer)
  } catch (error) {
    console.error('Ошибка прокси картинки:', error)
    return res
      .status(500)
      .json({ error: 'Не удалось загрузить изображение' })
  }
}
