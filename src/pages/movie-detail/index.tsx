import { useParams, useRouter } from "@tanstack/react-router"
import { useMovieDetail, MovieHero, MovieCast, MovieVideos, MovieDetailSkeleton } from "@/features/movie-detail"
import { useWatchlistStore } from "@/features/watchlist"
import { Button } from "@/shared/ui/button"
import { ArrowLeft } from "lucide-react"
import { ErrorState } from "@/shared/ui/feedback-states"

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movie/$movieId" })
  const { navigate } = useRouter()
  const { data: movie, isLoading, isError, error, refetch } = useMovieDetail(movieId)
  
  const { isInWatchlist, addMovie, removeMovie } = useWatchlistStore()
  const isSelected = movie ? isInWatchlist(movie.id) : false

  const handleWatchlistToggle = () => {
    if (!movie) return
    if (isSelected) {
      removeMovie(movie.id)
    } else {
      addMovie(movie)
    }
  }

  const handlePlayTrailer = () => {
    const element = document.getElementById("trailer")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  if (isLoading) return <MovieDetailSkeleton />

  if (isError || !movie) {
    return (
      <div className="container min-h-[60vh] flex items-center justify-center">
        <ErrorState 
          description={error instanceof Error ? error.message : "Não conseguimos carregar os detalhes deste filme."}
          onRetry={() => refetch()}
          className="w-full"
        />
      </div>
    )
  }

  return (
    <div className="container flex flex-col gap-12 py-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="flex items-center gap-4">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/" })} 
            className="rounded-full hover:bg-muted/40 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">
          Detalhes do Filme
        </span>
      </header>

      <main className="flex flex-col gap-16 pb-20">
        <MovieHero 
          movie={movie} 
          isSelected={isSelected} 
          onWatchlistToggle={handleWatchlistToggle} 
          onPlayTrailer={movie.videos?.results?.some(v => v.type === "Trailer") ? handlePlayTrailer : undefined}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 flex flex-col gap-16">
            {movie.credits && <MovieCast cast={movie.credits.cast} />}
            {movie.videos && <MovieVideos videos={movie.videos.results} />}
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-8">
             <div className="p-8 rounded-[2rem] bg-card/40 backdrop-blur-md border border-muted/20 space-y-6 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-tight text-primary">Informações Extras</h3>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-muted/10 pb-2">
                        <span className="text-muted-foreground font-medium">Idioma Original</span>
                        <span className="font-bold uppercase">{movie.original_language}</span>
                    </div>
                    <div className="flex justify-between border-b border-muted/10 pb-2">
                        <span className="text-muted-foreground font-medium">Popularidade</span>
                        <span className="font-bold">{movie.popularity.toFixed(0)} pts</span>
                    </div>
                    <div className="flex justify-between border-b border-muted/10 pb-2">
                        <span className="text-muted-foreground font-medium">Votos</span>
                        <span className="font-bold">{movie.vote_count.toLocaleString()}</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
