// src/app/api/proxy/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) {
    return new Response('Missing url', { status: 400 })
  }

  // Only allow Instagram CDN URLs for security
  if (!/^https?:\/\/instagram\.[^.]+\.fna\.fbcdn\.net\//.test(url)) {
    return new Response('Invalid url', { status: 400 })
  }

  const res = await fetch(url)
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const arrayBuffer = await res.arrayBuffer()
  return new Response(arrayBuffer, {
    headers: { 'Content-Type': contentType },
  })
}
