export default async function handler(req, res) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res
      .status(400)
      .json({ error: 'Не указан URL изображения' })
  }

  // Разрешаю только домен shikimori.io для безопасности
  if (!url.startsWith('https://shikimori.io')) {
    return res.status(403).json({
      error: 'Доступ разрешён только к shikimori.io',
    })
  }

  try {
    const imageRes = await fetch(url)

    if (!imageRes.ok) {
      return res.status(imageRes.status).end()
    }

    // Получаем тип контента
    const contentType =
      imageRes.headers.get('content-type') || 'image/jpeg'

    // Использую .arrayBuffer() вместо Buffer.from()
    const buffer = await imageRes.arrayBuffer()

    // Устанавливаю заголовки для браузера
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400') // Кеш на 24 часа

    // Отправляю ArrayBuffer напрямую
    return res.send(buffer)
  } catch (error) {
    console.error('Ошибка прокси картинки:', error)
    return res
      .status(500)
      .json({ error: 'Не удалось загрузить изображение' })
  }
}
