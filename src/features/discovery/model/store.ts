import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DiscoveryState {
  page: number
  filters: {
    query: string
    genre: string
    year: string
    minRating: number
  }
  setPage: (page: number) => void
  setFilters: (filters: Partial<DiscoveryState["filters"]>) => void
  resetDiscovery: () => void
}

export const useDiscoveryStore = create<DiscoveryState>()(
  persist(
    (set) => ({
      page: 1,
      filters: {
        query: "",
        genre: "",
        year: "",
        minRating: 0,
      },
      setPage: (page) => set({ page }),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          page: 1, // Reset page on filter change as per standard UX
        })),
      resetDiscovery: () =>
        set({
          page: 1,
          filters: { query: "", genre: "", year: "", minRating: 0 },
        }),
    }),
    {
      name: "cinedash-discovery-state",
    }
  )
)
