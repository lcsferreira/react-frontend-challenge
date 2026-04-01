export interface Movie {
  id: number
  title: string
  original_title?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  genres?: Genre[]
  adult: boolean
  video: boolean
  original_language: string
  videos?: VideosResponse
  credits?: CreditsResponse
}

export interface Genre {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface VideosResponse {
  id: number
  results: Video[]
}

export interface CreditsResponse {
  id: number
  cast: Cast[]
}
