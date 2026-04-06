import type { Video } from "@/entities/movie"
import { Youtube } from "lucide-react"

interface MovieVideosProps {
  videos: Video[]
}

export const MovieVideos = ({ videos }: MovieVideosProps) => {
  const trailer = videos.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  )

  if (!trailer) return null

  return (
    <div id="trailer" className="space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-widest text-foreground/80 border-l-4 border-primary pl-4">
        Trailer Oficial
      </h2>
      <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] bg-muted/30 border-8 border-muted/20 shadow-2xl transition-transform hover:scale-[1.01]">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 p-2 rounded-full bg-secondary/80 backdrop-blur-md border border-secondary/50 text-[10px] font-black uppercase tracking-widest text-secondary-foreground shadow-lg pointer-events-none">
           <Youtube className="h-3 w-3 text-red-500 fill-red-500" />
           YouTube Official
        </div>
      </div>
    </div>
  )
}
