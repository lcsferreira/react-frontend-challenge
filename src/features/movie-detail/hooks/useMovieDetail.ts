import { useQuery } from "@tanstack/react-query"
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../api/tmdb"
import { QUERY_TIMES } from "@/shared/lib/constants"


export const useMovieDetail = (movieId: number | string) => {
  return useQuery({
    queryKey: ["movie", "detail", movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: QUERY_TIMES.MOVIE_DETAILS,
    enabled: !!movieId,
  })
}

export const useMovieCredits = (movieId: number | string) => {
  return useQuery({
    queryKey: ["movie", "credits", movieId],
    queryFn: () => getMovieCredits(movieId),
    staleTime: QUERY_TIMES.MOVIE_DETAILS,
    enabled: !!movieId,
  })
}

export const useMovieVideos = (movieId: number | string) => {
  return useQuery({
    queryKey: ["movie", "videos", movieId],
    queryFn: () => getMovieVideos(movieId),
    staleTime: QUERY_TIMES.MOVIE_DETAILS,
    enabled: !!movieId,
  })
}
