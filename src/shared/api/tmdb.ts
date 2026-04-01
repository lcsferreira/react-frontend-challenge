import { TMDB_BASE_URL } from '../lib/constants'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

if (!TMDB_API_KEY) {
  console.warn('VITE_TMDB_API_KEY is not defined!')
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>
}

export async function tmdbFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options
  
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  
  url.searchParams.append('api_key', TMDB_API_KEY || '')
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.status_message || `TMDB API error: ${response.status}`)
  }

  return response.json()
}
