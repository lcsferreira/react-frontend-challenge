import { describe, it, expect, beforeEach } from "vitest"
import { useWatchlistStore } from "./store"
import type { Movie } from "@/entities/movie"

const mockMovie: Movie = {
  id: 1,
  title: "A Origem",
  overview: "Um ladrão que rouba segredos corporativos...",
  poster_path: "/inception.jpg",
  backdrop_path: "/inception-bg.jpg",
  release_date: "2010-07-16",
  vote_average: 8.8,
  vote_count: 30000,
  popularity: 154.5,
  genre_ids: [28, 878, 12],
  adult: false,
  video: false,
  original_language: "en",
}

describe("Watchlist Store", () => {
  beforeEach(() => {
    useWatchlistStore.getState().clearWatchlist()
  })

  it("should start with an empty list", () => {
    const { movies } = useWatchlistStore.getState()
    expect(movies).toEqual([])
  })

  it("should add a movie to the watchlist", () => {
    const { addMovie } = useWatchlistStore.getState()
    
    addMovie(mockMovie)
    
    const { movies } = useWatchlistStore.getState()
    expect(movies).toHaveLength(1)
    expect(movies[0].id).toBe(mockMovie.id)
  })

  it("should not add duplicate movies", () => {
    const { addMovie } = useWatchlistStore.getState()
    
    addMovie(mockMovie)
    addMovie(mockMovie) 
    
    const { movies } = useWatchlistStore.getState()
    expect(movies).toHaveLength(1)
  })

  it("should remove a movie from the watchlist", () => {
    const { addMovie, removeMovie } = useWatchlistStore.getState()
    
    addMovie(mockMovie)
    removeMovie(mockMovie.id)
    
    const { movies } = useWatchlistStore.getState()
    expect(movies).toHaveLength(0)
  })

  it("should correctly check if a movie isInWatchlist", () => {
    const { addMovie, isInWatchlist } = useWatchlistStore.getState()
    
    expect(isInWatchlist(mockMovie.id)).toBe(false)
    
    addMovie(mockMovie)
    
    expect(isInWatchlist(mockMovie.id)).toBe(true)
  })
})
