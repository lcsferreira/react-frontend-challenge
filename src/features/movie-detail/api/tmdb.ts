import { tmdbFetch } from "@/shared/api/tmdb"
import type { Movie, CreditsResponse, VideosResponse } from "@/entities/movie"

export const getMovieDetails = (movieId: number | string) =>
  tmdbFetch<Movie>(`movie/${movieId}`, {
    params: { language: "pt-BR", append_to_response: "videos,credits" },
  })

export const getMovieCredits = (movieId: number | string) =>
  tmdbFetch<CreditsResponse>(`movie/${movieId}/credits`, {
    params: { language: "pt-BR" },
  })

export const getMovieVideos = (movieId: number | string) =>
  tmdbFetch<VideosResponse>(`movie/${movieId}/videos`, {
    params: { language: "pt-BR" },
  })
