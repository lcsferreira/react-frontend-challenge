import type { Cast } from "@/entities/movie"
import { TMDB_IMAGE_BASE_URL } from "@/shared/lib/constants"
import { User } from "lucide-react"

interface MovieCastProps {
  cast: Cast[]
}

export const MovieCast = ({ cast }: MovieCastProps) => {
  if (!cast || cast.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-widest text-foreground/80 border-l-4 border-primary pl-4">
        Elenco Principal
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
        {cast.slice(0, 12).map((actor) => (
          <div 
            key={actor.id} 
            className="flex-shrink-0 w-32 group animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <div className="h-44 w-full rounded-2xl overflow-hidden border border-muted/20 bg-muted/30 shadow-lg transition-transform group-hover:scale-105">
              {actor.profile_path ? (
                <img
                  src={`${TMDB_IMAGE_BASE_URL}w185${actor.profile_path}`}
                  alt={actor.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground/30 bg-muted/50">
                  <User className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="mt-3 space-y-0.5">
              <p className="text-sm font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                {actor.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1 italic">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
