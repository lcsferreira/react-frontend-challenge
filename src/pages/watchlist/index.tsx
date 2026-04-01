import { WatchlistTable } from "@/features/watchlist"
import { Bookmark, LayoutGrid, List } from "lucide-react"
import { useRouter } from "@tanstack/react-router"
import { Button } from "@/shared/ui/button"

export function WatchlistPage() {
  const { navigate } = useRouter()

  const handleMovieClick = (id: number) => {
    navigate({ to: "/movie/$movieId", params: { movieId: id.toString() } })
  }

  return (
    <div className="container flex flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
          <Bookmark className="h-6 w-6" />
          <span className="text-xl uppercase tracking-[0.2em]">CineDash</span>
        </div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
              Minha Lista
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground/80 font-medium">
              Sua curadoria pessoal de filmes para assistir.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })} className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Descobrir mais
            </Button>
            <div className="h-10 w-[1px] bg-muted/30 mx-2 hidden sm:block" />
            <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/20 border border-muted/20">
               <Button variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
                  <List className="h-4 w-4" />
               </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="min-h-[400px]">
        <WatchlistTable onMovieClick={handleMovieClick} />
      </section>
    </div>
  )
}
