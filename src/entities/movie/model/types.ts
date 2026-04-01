export interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genres?: { id: number; name: string }[]
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
