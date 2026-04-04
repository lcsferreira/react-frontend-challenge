import { useEffect } from "react"
import { useMovies, MovieGrid, DiscoveryFilters, useDiscoveryStore, useGenres } from "@/features/discovery"
import { useGenreStore } from "@/entities/movie"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { Pagination } from "@/shared/ui/pagination"
import { useRouter } from "@tanstack/react-router"
import { Compass, TrendingUp, Search as SearchIcon, FilterX } from "lucide-react"
import { Button } from "@/shared/ui/button"

export function DashboardPage() {
  const { navigate } = useRouter()
  const { page, filters, setPage, setFilters, resetDiscovery } = useDiscoveryStore()
  const { data: genresData = [] } = useGenres()
  const setGenres = useGenreStore((s) => s.setGenres)

  useEffect(() => {
    if (genresData.length > 0) {
      setGenres(genresData)
    }
  }, [genresData, setGenres])

  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(filters.query, 500)

  const { data, isLoading } = useMovies({
    ...filters,
    query: debouncedQuery,
    page,
  })

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    resetDiscovery()
  }

  const handleMovieClick = (id: number) => {
    navigate({ to: "/movie/$movieId", params: { movieId: id.toString() } })
  }

  const isSearching = debouncedQuery.length > 0
  const hasFilters = filters.genre || filters.year || filters.minRating > 0

  const getActiveFilterLabel = () => {
    if (isSearching) return "BUSCANDO"
    if (!hasFilters) return "EM ALTA HOJE"
    
    const parts = []
    if (filters.genre) {
      const genreName = genresData.find(g => g.id.toString() === filters.genre)?.name
      if (genreName) parts.push(genreName)
    }
    if (filters.year) parts.push(filters.year)
    if (filters.minRating > 0) parts.push(`★ ${filters.minRating}+`)
    
    return parts.join(" • ").toUpperCase()
  }

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
          
          <div className="flex items-center gap-3">
            { (hasFilters || isSearching) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearFilters}
                className="rounded-full h-10 px-4 gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all font-bold uppercase tracking-wider text-[10px]"
              >
                <FilterX className="h-3 w-3" /> Limpar Filtros
              </Button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-muted/20 text-xs font-bold text-secondary-foreground shadow-sm animate-in slide-in-from-right-4">
               {isSearching ? <SearchIcon className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 text-red-500" />}
               {getActiveFilterLabel()}
            </div>
          </div>
        </div>
      </header>

      <DiscoveryFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />

      <section className="flex flex-col gap-10">
        <MovieGrid 
          movies={data?.results} 
          isLoading={isLoading} 
          onMovieClick={handleMovieClick}
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
