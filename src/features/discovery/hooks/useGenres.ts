import { useQuery } from "@tanstack/react-query"
import { getGenres } from "../api/tmdb"
import { QUERY_TIMES } from "@/shared/lib/constants"

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await getGenres()
      return response.genres
    },
    staleTime: QUERY_TIMES.GENRES,
  })
}
