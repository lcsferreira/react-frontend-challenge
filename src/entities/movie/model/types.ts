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
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
