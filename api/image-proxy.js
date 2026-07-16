import { Buffer } from 'node:buffer'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Метод не разрешён' })
  }

  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Не указан URL' })
  }

  if (!url.startsWith('https://shikimori.io')) {
    return res
      .status(403)
      .json({ error: 'Доступ только к shikimori.io' })
  }

  try {
    const imageRes = await fetch(url)

    if (!imageRes.ok) {
      return res.status(imageRes.status).end()
    }

    const contentType =
      imageRes.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await imageRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Конвертируем в Base64
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${contentType};base64,${base64}`

    // Отдаём как JSON
    return res.status(200).json({ imageUrl: dataUrl })
  } catch (error) {
    console.error('Ошибка прокси:', error)
    return res
      .status(500)
      .json({ error: 'Ошибка загрузки' })
  }
}
