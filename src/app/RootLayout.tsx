import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { Film, LogOut, Moon, Sun, Bookmark, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '@/features/auth/model/store'
import { useThemeStore } from '@/features/theme/model/store'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

export function RootLayout() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-bold text-2xl tracking-tight transition-opacity hover:opacity-80"
            >
              <div className="bg-primary rounded-lg p-1">
                <Film className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                CineDash
              </span>
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-1">
                <Link 
                  to="/" 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-accent",
                  )}
                  activeProps={{ className: 'bg-accent text-primary shadow-sm' }}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link 
                  to="/watchlist" 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-accent",
                  )}
                  activeProps={{ className: 'bg-accent text-primary shadow-sm' }}
                >
                  <Bookmark className="h-4 w-4" />
                  Minha Lista
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full flex-shrink-0"
              title="Trocar tema"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>


            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2 pl-2 border-l">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold leading-none">{user?.username}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Premium</span>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-full text-muted-foreground hover:text-destructive transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="rounded-full px-6">Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden pt-6 pb-12">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for curators by the CineDash team. Powered by TMDB API.
          </p>
        </div>
      </footer>
    </div>
  )
}

