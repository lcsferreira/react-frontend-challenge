import { Input } from "@/shared/ui/input"
import { Select } from "@/shared/ui/select"
import { Label } from "@/shared/ui/label"
import { useGenres } from "../hooks/useGenres"
import { Search } from "lucide-react"

export interface SearchFilters {
  query: string
  genre: string
  year: string
  minRating: number
}

interface DiscoveryFiltersProps {
  filters: SearchFilters
  onFilterChange: (filters: Partial<SearchFilters>) => void
}

export const DiscoveryFilters = ({
  filters,
  onFilterChange,
}: DiscoveryFiltersProps) => {
  const { data: genres = [], isLoading: isLoadingGenres } = useGenres()

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-card/40 backdrop-blur-md border border-muted/20 shadow-sm transition-all hover:bg-card/60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {/* Search */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-80 pl-0.5">
            Busca de filmes
          </Label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Digite o título..."
              value={filters.query}
              onChange={(e) => onFilterChange({ query: e.target.value })}
              className="pl-10 h-11 bg-background/50 focus:bg-background transition-all"
            />
          </div>
        </div>

        {/* Gênero */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-80 pl-0.5">
            Gênero
          </Label>
          <Select
            value={filters.genre}
            onChange={(e) => onFilterChange({ genre: e.target.value })}
            className="h-11 bg-background/50 focus:bg-background transition-all cursor-pointer"
            disabled={isLoadingGenres}
          >
            <option value="">Todos os gêneros</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id.toString()}>
                {g.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Ano */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-80 pl-0.5">
            Ano de lançamento
          </Label>
          <Input
            type="number"
            placeholder="Ex: 2024"
            min="1900"
            max="2030"
            value={filters.year}
            onChange={(e) => onFilterChange({ year: e.target.value })}
            className="h-11 bg-background/50 focus:bg-background transition-all"
          />
        </div>

        {/* Nota Mínima */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-80 pl-0.5">
            Nota Mínima (0-10)
          </Label>
          <div className="flex items-center gap-3">
             <Input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={filters.minRating || ""}
                onChange={(e) => onFilterChange({ minRating: e.target.value === "" ? 0 : Number(e.target.value) })}
                onFocus={(e) => e.target.select()}
                className="h-11 bg-background/50 focus:bg-background transition-all"
              />
          </div>
        </div>
      </div>
    </div>
  )
}
