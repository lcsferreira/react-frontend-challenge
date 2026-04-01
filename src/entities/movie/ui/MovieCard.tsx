import { Star, Calendar } from "lucide-react"
import type { Movie } from "../model/types"
import { TMDB_IMAGE_BASE_URL } from "@/shared/lib/constants"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { formatDate, formatRating } from "../lib/formatters"
import { cn } from "@/shared/lib/utils"

interface MovieCardProps {
  movie: Movie
  className?: string
  onClick?: () => void
}

export const MovieCard = ({ movie, className, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Poster"

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer bg-card/50 backdrop-blur-sm border-muted/20",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="absolute right-2 top-2 rounded-full bg-secondary/80 px-2 py-1 text-xs font-bold text-secondary-foreground backdrop-blur-md shadow-sm border border-secondary/50 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            {formatRating(movie.vote_average)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground/80 italic">
          {movie.overview || "Sem sinopse disponível."}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <Calendar className="h-3.5 w-3.5 text-primary/70" />
          <span>{formatDate(movie.release_date)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
