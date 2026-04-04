import type { ColumnDef } from "@tanstack/react-table"
import type { Movie } from "@/entities/movie"
import { formatRating, formatDate, formatGenres } from "@/entities/movie/lib/formatters"
import { Star, MoreHorizontal, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

import { TMDB_IMAGE_BASE_URL } from "@/shared/lib/constants"

import { useGenreStore } from "@/entities/movie"

export const getColumns = (onRemove: (id: number) => void, onDetails: (id: number) => void): ColumnDef<Movie>[] => [
  {
    accessorKey: "title",
    header: "Filme",
    cell: ({ row }) => {
      const movie = row.original
      const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}w92${movie.poster_path}`
        : "https://via.placeholder.com/92x138?text=Sem+Poster"

      return (
        <div className="flex items-center gap-4">
          <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-muted/20 bg-muted/50 shadow-sm transition-transform group-hover:scale-105">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-black tracking-tight text-foreground group-hover:text-primary transition-colors max-w-[200px] truncate md:max-w-none">
            {movie.title}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "genres",
    header: "Gênero",
    cell: ({ row }) => {
      const movie = row.original
      const getGenreNames = useGenreStore.getState().getGenreNames
      const genreText = movie.genres && movie.genres.length > 0 
        ? formatGenres(movie.genres) 
        : getGenreNames(movie.genre_ids)

      return (
        <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md">
          {genreText}
        </span>
      )
    },
  },
  {
    accessorKey: "release_date",
    header: "Data de Lançamento",
    cell: ({ row }) => <span className="text-sm opacity-80">{formatDate(row.original.release_date)}</span>,
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 font-bold text-yellow-500">
        <Star className="h-4 w-4 fill-yellow-500" />
        {formatRating(row.original.vote_average)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const movie = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDetails(movie.id)} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Ver Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRemove(movie.id)}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
