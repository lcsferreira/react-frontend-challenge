import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '@/entities/movie/model/types'

interface WatchlistState {
  movies: Movie[]
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
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
        set({ movies: get().movies.filter((m) => m.id !== movieId) })
      },
      isInWatchlist: (movieId) => {
        return get().movies.some((m) => m.id === movieId)
      },
    }),
    {
      name: 'watchlist-storage',
    }
  )
)
