export const TMDB_BASE_URL = import.meta.env.VITE_API_URL
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"

export const QUERY_TIMES = {
  TRENDING: 5 * 60 * 1000,   
  MOVIE_DETAILS: 10 * 60 * 1000, 
  GENRES: 24 * 60 * 60 * 1000, 
} as const
