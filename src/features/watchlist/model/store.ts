import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Movie } from "@/entities/movie"

interface WatchlistState {
  movies: Movie[]
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  clearWatchlist: () => void
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      movies: [],
      addMovie: (movie) => {
        const { movies } = get()
        if (!movies.some((m) => m.id === movie.id)) {
          set({ movies: [...movies, movie] })
        }
      },
      removeMovie: (movieId) => {
        const { movies } = get()
        set({ movies: movies.filter((m) => m.id !== movieId) })
      },
      isInWatchlist: (movieId) => {
        return get().movies.some((m) => m.id === movieId)
      },
      clearWatchlist: () => set({ movies: [] }),
    }),
    {
      name: "cinedash-watchlist",
    }
  )
)
