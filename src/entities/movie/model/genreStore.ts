import { create } from "zustand"
import type { Genre } from "./types"

interface GenreState {
  genres: Record<number, string>
  setGenres: (genres: Genre[]) => void
  getGenreNames: (ids: number[]) => string
}

export const useGenreStore = create<GenreState>((set, get) => ({
  genres: {},
  setGenres: (genreList) => {
    const genreMap: Record<number, string> = {}
    genreList.forEach((g) => {
      genreMap[g.id] = g.name
    })
    set({ genres: genreMap })
  },
  getGenreNames: (ids) => {
    if (!ids || ids.length === 0) return "Desconhecido"
    const { genres } = get()
    const names = ids.map((id) => genres[id] || "Outro").filter((n) => n !== "Outro")
    return names.length > 0 ? names.join(", ") : "Desconhecido"
  },
}))
