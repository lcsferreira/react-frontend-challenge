import { useState } from "react"
import { useMovies, MovieGrid, DiscoveryFilters } from "@/features/discovery"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { Pagination } from "@/shared/ui/pagination"
import { Compass, TrendingUp, Search as SearchIcon } from "lucide-react"

export function DashboardPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    query: "",
    genre: "",
    year: "",
    minRating: 0,
  })

  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(filters.query, 500)

  const { data, isLoading } = useMovies({
    ...filters,
    query: debouncedQuery,
    page,
  })

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setPage(1) // Reset to first page on filter change
  }

  const handleClearFilters = () => {
    setFilters({ query: "", genre: "", year: "", minRating: 0 })
    setPage(1)
  }

  const isSearching = debouncedQuery.length > 0
  const hasFilters = filters.genre || filters.year || filters.minRating > 0

  return (
    <div className="container flex flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
          <Compass className="h-6 w-6" />
          <span className="text-xl uppercase tracking-[0.2em]">CineDash</span>
        </div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
              {isSearching ? "Resultados da Busca" : hasFilters ? "Filmes Filtrados" : "Descubra Filmes"}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground/80 font-medium">
              Explore os filmes mais populares, em destaque ou busque por seus favoritos.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-muted/20 text-xs font-bold text-secondary-foreground shadow-sm">
             {isSearching ? (
                <><SearchIcon className="h-3 w-3" /> BUSCANDO</>
             ) : (
                <><TrendingUp className="h-3 w-3 text-red-500" /> EM ALTA HOJE</>
             )}
          </div>
        </div>
      </header>

      <DiscoveryFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClear={handleClearFilters}
      />

      <section className="flex flex-col gap-10">
        <MovieGrid 
          movies={data?.results} 
          isLoading={isLoading} 
        />

        {data && data.total_pages > 1 && (
          <div className="flex justify-center border-t border-muted/10 pt-8 pb-4">
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  )
}
