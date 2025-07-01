'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ImageIcon as ImageIconLucide,
  Instagram,
  Loader2,
  Play,
  Search,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!url) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const encodedUrl = encodeURIComponent(url)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?url=${encodedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            'x-rapidapi-host': `${process.env.NEXT_PUBLIC_HOSTNAME}`,
          },
        }
      )

      const result = await response.json()

      if (!result.error) {
        setData(result)
      } else {
        setError('Failed to fetch content.')
      }
    } catch (err) {
      setError('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-pink-600/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 py-12 px-4 flex flex-col items-center'>
        {/* Header Section */}
        <div className='text-center mb-12 space-y-4'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200'>
              <Instagram className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent'>
              InstaDownloader
            </h1>
          </div>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed'>
            Download Instagram photos and videos instantly. Simply paste the URL
            and get high-quality media files.
          </p>
          <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Fast • Secure • Free</span>
          </div>
        </div>

        {/* Search Section */}
        <Card className='w-full max-w-2xl mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300'>
          <CardContent className='p-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative flex-1'>
                <Input
                  placeholder='https://www.instagram.com/p/...'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className='pl-12 h-12 text-lg border-2 border-gray-200 focus:border-pink-400 transition-all duration-200 focus:ring-2 focus:ring-pink-200'
                />
                <Instagram className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                {url && (
                  <button
                    onClick={() => setUrl('')}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    ✕
                  </button>
                )}
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading || !url.trim()}
                className='h-12 px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'
              >
                {loading ? (
                  <>
                    <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                    Processing...
                  </>
                ) : (
                  <>
                    <Search className='w-5 h-5 mr-2' />
                    Download
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className='w-full max-w-2xl mb-8 border-red-200 bg-red-50/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300'>
            <CardContent className='p-4'>
              <div className='flex items-center gap-3 text-red-700'>
                <AlertCircle className='w-5 h-5 animate-pulse' />
                <p className='font-medium'>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <Card className='w-full max-w-2xl mb-8 border-blue-200 bg-blue-50/80 backdrop-blur-sm'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-center gap-3 text-blue-700'>
                <Loader2 className='w-6 h-6 animate-spin' />
                <div className='text-center'>
                  <p className='font-medium'>Fetching Instagram content...</p>
                  <p className='text-sm text-blue-600'>
                    This may take a few seconds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {data && (
          <Card className='w-full max-w-5xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500'>
            <CardContent className='p-8'>
              {/* Success indicator */}
              <div className='flex items-center gap-2 mb-6 text-green-600'>
                <CheckCircle2 className='w-5 h-5' />
                <span className='font-semibold'>
                  Content found successfully!
                </span>
                <Badge
                  variant='outline'
                  className='ml-auto border-green-200 text-green-700'
                >
                  {data.medias?.length || 0} files
                </Badge>
              </div>

              {/* Caption */}
              {data.caption && (
                <div className='mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-pink-400 hover:shadow-md transition-shadow duration-200'>
                  <h3 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                    <span>📝</span> Caption
                  </h3>
                  <p className='text-gray-700 whitespace-pre-line leading-relaxed'>
                    {data.caption}
                  </p>
                </div>
              )}

              {/* Media Grid */}
              {data.medias && data.medias.length > 0 ? (
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                      <span>🎬</span> Media Files
                    </h3>
                    <div className='flex gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-purple-100 text-purple-700'
                      >
                        {data.medias.length}{' '}
                        {data.medias.length === 1 ? 'file' : 'files'}
                      </Badge>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data.medias.map((media, idx) => (
                      <div
                        key={idx}
                        className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1'
                      >
                        <div className='aspect-square relative overflow-hidden'>
                          {media.type === 'image' ? (
                            <>
                              <img
                                src={
                                  media.download_url
                                    ? `/api/proxy?url=${encodeURIComponent(
                                        media.download_url
                                      )}`
                                    : '/placeholder.svg?height=400&width=400'
                                }
                                alt={`Instagram media ${idx + 1}`}
                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                loading='lazy'
                                width={400}
                                height={400}
                              />
                              <div className='absolute top-3 left-3'>
                                <Badge className='bg-blue-500 hover:bg-blue-600 shadow-lg'>
                                  <ImageIconLucide className='w-3 h-3 mr-1' />
                                  Image
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <VideoPreview
                              thumb={media.thumb}
                              videoUrl={media.download_url}
                              idx={idx}
                            />
                          )}

                          {/* Overlay on hover */}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4'>
                            <Button
                              className='bg-white text-gray-800 hover:bg-gray-100 shadow-xl font-semibold border-2 border-white/20'
                              onClick={async (e) => {
                                e.preventDefault()
                                const url = media.download_url
                                  ? `/api/proxy?url=${encodeURIComponent(
                                      media.download_url
                                    )}`
                                  : '/placeholder.svg?height=400&width=400'
                                const response = await fetch(url)
                                const blob = await response.blob()
                                const link = document.createElement('a')
                                link.href = window.URL.createObjectURL(blob)
                                link.download = `instagram-media-${idx + 1}.${
                                  media.type === 'video' ? 'mp4' : 'jpg'
                                }`
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                              }}
                            >
                              <Download className='w-4 h-4 mr-2' />
                              Download
                            </Button>
                          </div>

                          {/* File number indicator */}
                          <div className='absolute top-3 right-3'>
                            <div className='w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                              {idx + 1}
                            </div>
                          </div>
                        </div>

                        {/* Bottom download button for mobile */}
                        <div className='p-4 md:hidden'>
                          <Link
                            href={media.download_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-full'
                          >
                            <Button className='w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg'>
                              <Download className='w-4 h-4 mr-2' />
                              Download{' '}
                              {media.type === 'image' ? 'Image' : 'Video'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : data.download_url ? (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-6'>
                    <div className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1'>
                      <div className='aspect-square relative overflow-hidden'>
                        {data.type === 'image' ? (
                          <>
                            <img
                              src={
                                data.download_url
                                  ? `/api/proxy?url=${encodeURIComponent(
                                      data.download_url
                                    )}`
                                  : '/placeholder.svg?height=400&width=400'
                              }
                              alt={`Instagram media`}
                              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                              loading='lazy'
                              width={400}
                              height={400}
                            />
                            <div className='absolute top-3 left-3'>
                              <Badge className='bg-blue-500 hover:bg-blue-600 shadow-lg'>
                                <ImageIconLucide className='w-3 h-3 mr-1' />
                                Image
                              </Badge>
                            </div>
                          </>
                        ) : (
                          <VideoPreview
                            thumb={data.thumb}
                            videoUrl={data.download_url}
                            idx={0}
                          />
                        )}
                        {/* Overlay on hover */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4'>
                          <Button
                            className='bg-white text-gray-800 hover:bg-gray-100 shadow-xl font-semibold border-2 border-white/20'
                            onClick={async (e) => {
                              e.preventDefault()
                              const url = data.download_url
                                ? `/api/proxy?url=${encodeURIComponent(
                                    data.download_url
                                  )}`
                                : '/placeholder.svg?height=400&width=400'
                              const response = await fetch(url)
                              const blob = await response.blob()
                              const link = document.createElement('a')
                              link.href = window.URL.createObjectURL(blob)
                              link.download = `instagram-media-1.${
                                data.type === 'video' ? 'mp4' : 'jpg'
                              }`
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                            }}
                          >
                            <Download className='w-4 h-4 mr-2' />
                            Download
                          </Button>
                        </div>
                        {/* File number indicator */}
                        <div className='absolute top-3 right-3'>
                          <div className='w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                            1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className='mt-16 text-center text-gray-500 space-y-2'>
          <p className='text-sm'>Made with ❤️ for Instagram content creators</p>
          <div className='flex items-center justify-center gap-4 text-xs'>
            <span className='flex items-center gap-1'>
              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
              Fast Downloads
            </span>
            <span className='flex items-center gap-1'>
              <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
              High Quality
            </span>
            <span className='flex items-center gap-1'>
              <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
              No Watermarks
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

function VideoPreview({ thumb, videoUrl, idx }) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className='relative'>
      {!showVideo && (
        <div className='h-[300px] w-full relative group'>
          <img
            src={thumb || '/placeholder.svg?height=400&width=400'}
            alt={`Instagram video preview ${idx + 1}`}
            className='w-[300px] h-[300px] object-cover rounded-xl bg-black cursor-pointer'
            width={150}
            height={150}
            // style={{ maxHeight: 400, maxWidth: 400, aspectRatio: '1/1' }}
            onClick={() => setShowVideo(true)}
          />

          <div className='absolute top-3 left-3'>
            <Badge className='bg-green-500 hover:bg-green-600 shadow-lg'>
              <Play className='w-3 h-3 mr-1' />
              Video
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
