import { useState } from "react"
import type { Movie } from "@/entities/movie"
import { TMDB_IMAGE_BASE_URL } from "@/shared/lib/constants"
import { formatRating, formatDate, formatGenres } from "@/entities/movie/lib/formatters"
import { Star, Calendar, Bookmark, BookmarkCheck, Play, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

interface MovieHeroProps {
  movie: Movie
  isSelected?: boolean
  onWatchlistToggle?: () => void
  onPlayTrailer?: () => void
}

export const MovieHero = ({ movie, isSelected, onWatchlistToggle, onPlayTrailer }: MovieHeroProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isRecentRelease = () => {
    if (!movie.release_date) return false
    const releaseDate = new Date(movie.release_date)
    const today = new Date()
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(today.getMonth() - 3)
    
    return releaseDate >= threeMonthsAgo && releaseDate <= today
  }

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}original${movie.backdrop_path}`
    : null

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Poster"

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden rounded-[2rem] bg-background border border-muted/20 shadow-2xl">
      {backdropUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center grayscale-[0.3] opacity-30 blur-sm scale-110"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-20 flex flex-col md:flex-row gap-8 p-8 md:p-12 items-center md:items-end">

        <div className="w-[180px] md:w-[280px] flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in duration-500 border border-muted/20">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left pb-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              {isRecentRelease() && (
                <span className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                  Lançamento
                </span>
              )}
              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDate(movie.release_date)}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 font-bold border border-yellow-500/20">
                <Star className="h-4 w-4 fill-yellow-500" />
                {formatRating(movie.vote_average)}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {movie.title}
            </h1>
            
            <p className="text-sm font-bold text-muted-foreground/80 tracking-widest uppercase">
              {formatGenres(movie.genres)}
            </p>
          </div>

          <div className="space-y-4">
            <p className={cn(
                "text-lg leading-relaxed text-muted-foreground italic max-w-xl transition-all duration-500",
                !isExpanded && movie.overview && movie.overview.length > 280 && "line-clamp-4"
            )}>
              {movie.overview || "Sem sinopse disponível."}
            </p>
            
            {movie.overview && movie.overview.length > 280 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 px-2 text-primary hover:bg-primary/5 font-bold uppercase tracking-widest text-[10px] gap-2"
              >
                {isExpanded ? (
                  <>Ver Menos <ChevronUp className="h-3 w-3" /></>
                ) : (
                  <>Ver Mais <ChevronDown className="h-3 w-3" /></>
                )}
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {onPlayTrailer && (
              <Button 
                size="lg" 
                onClick={onPlayTrailer}
                className="h-14 px-8 rounded-full font-bold gap-2 text-lg shadow-lg shadow-primary/20"
              >
                <Play className="h-5 w-5 fill-current" /> Assistir Trailer
              </Button>
            )}
            <Button 
                variant="outline" 
                size="lg" 
                className={cn(
                    "h-14 w-14 rounded-full border-2 transition-all p-0",
                    isSelected ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"
                )}
                onClick={onWatchlistToggle}
                title={isSelected ? "Remover da Watchlist" : "Adicionar à Watchlist"}
            >
              {isSelected ? (
                <BookmarkCheck className="h-6 w-6" />
              ) : (
                <Bookmark className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
