import { tmdbFetch } from "@/shared/api/tmdb"
import type { TMDBResponse, Movie, Genre } from "@/entities/movie"

export interface DiscoverParams {
  page?: number
  query?: string
  with_genres?: string
  primary_release_year?: string
  "vote_average.gte"?: number
}

/**
 * Get trending movies.
 */
export const getTrending = (page = 1) =>
  tmdbFetch<TMDBResponse<Movie>>("trending/movie/day", {
    params: { page, language: "pt-BR" },
  })

/**
 * Get popular movies.
 */
export const getPopular = (page = 1) =>
  tmdbFetch<TMDBResponse<Movie>>("movie/popular", {
    params: { page, language: "pt-BR" },
  })

/**
 * Search movies by name.
 */
export const searchMovies = (query: string, page = 1) =>
  tmdbFetch<TMDBResponse<Movie>>("search/movie", {
    params: { query, page, language: "pt-BR", include_adult: "false" },
  })

/**
 * Get genre list.
 */
export const getGenres = () =>
  tmdbFetch<{ genres: Genre[] }>("genre/movie/list", {
    params: { language: "pt-BR" },
  })

/**
 * Discover movies with filters.
 */
export const getDiscover = (params: DiscoverParams) =>
  tmdbFetch<TMDBResponse<Movie>>("discover/movie", {
    params: {
      ...params,
      language: "pt-BR",
      include_adult: "false",
      sort_by: "popularity.desc",
    },
  })
