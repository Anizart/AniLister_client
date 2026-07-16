import { Buffer } from 'node:buffer'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Метод не разрешён' })
    return
  }

  const { url } = req.query

  if (!url || typeof url !== 'string') {
    res
      .status(400)
      .json({ error: 'Не указан URL изображения' })
    return
  }

  if (!url.startsWith('https://shikimori.io')) {
    res
      .status(403)
      .json({
        error: 'Доступ разрешён только к shikimori.io',
      })
    return
  }

  try {
    const imageRes = await fetch(url)

    if (!imageRes.ok) {
      res.status(imageRes.status).end()
      return
    }

    const contentType =
      imageRes.headers.get('content-type') || 'image/jpeg'

    // Конвертация теперь точно будет работать и в IDE, и на сервере
    const arrayBuffer = await imageRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  } catch (error) {
    console.error('Ошибка прокси картинки:', error)
    res
      .status(500)
      .json({ error: 'Не удалось загрузить изображение' })
  }
}
