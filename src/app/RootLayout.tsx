import { Link, Outlet } from '@tanstack/react-router'
import { Film } from 'lucide-react'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6 text-primary" />
            <span>CineDash</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link 
              to="/" 
              className="transition-colors hover:text-foreground/80 text-foreground"
              activeProps={{ className: 'text-primary' }}
            >
              Dashboard
            </Link>
            <Link 
              to="/watchlist" 
              className="transition-colors hover:text-foreground/80 text-foreground"
              activeProps={{ className: 'text-primary' }}
            >
              Watchlist
            </Link>
            <Link 
              to="/login" 
              className="transition-colors hover:text-foreground/80 text-foreground"
              activeProps={{ className: 'text-primary' }}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
