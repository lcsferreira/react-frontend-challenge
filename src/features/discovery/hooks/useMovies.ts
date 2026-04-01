import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { getTrending, searchMovies, getDiscover } from "../api/tmdb"
import { QUERY_TIMES } from "@/shared/lib/constants"

export interface MovieFilters {
  query?: string
  genre?: string
  year?: string
  minRating?: number
  page?: number
}

/**
 * Custom hook to fetch movies based on filters and pagination.
 */
export const useMovies = (filters: MovieFilters) => {
  const { query, genre, year, minRating = 0, page = 1 } = filters

  return useQuery({
    queryKey: ["movies", "discovery", { query, genre, year, minRating, page }],
    queryFn: async () => {
      // Priority 1: Search by query (ignoring other filters if query is present)
      if (query && query.trim().length > 0) {
        return searchMovies(query, page)
      }

      // Priority 2: Use discover if any filters are present
      if (genre || year || minRating > 0) {
        return getDiscover({
          page,
          with_genres: genre,
          primary_release_year: year,
          "vote_average.gte": minRating,
        })
      }

      // Priority 3: Default to trending
      return getTrending(page)
    },
    placeholderData: keepPreviousData,
    staleTime: QUERY_TIMES.TRENDING,
  })
}
