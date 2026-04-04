import { MovieCard, MovieCardSkeleton } from "@/entities/movie"
import type { Movie } from "@/entities/movie"
import { cn } from "@/shared/lib/utils"

import { EmptyState } from "@/shared/ui/feedback-states"

interface MovieGridProps {
  movies: Movie[] | undefined
  isLoading: boolean
  className?: string
  onMovieClick?: (id: number) => void
}

export const MovieGrid = ({
  movies,
  isLoading,
  className,
  onMovieClick,
}: MovieGridProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
          className
        )}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex justify-center w-full py-10">
        <EmptyState 
           title="Nenhum filme encontrado" 
           description="Tente ajustar seus filtros ou mudar os termos da busca."
           className="w-full"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie.id)}
        />
      ))}
    </div>
  )
}
