import { Link, useRouter } from "@tanstack/react-router"
import { useThemeStore } from "../model/themeStore"
import { Button } from "./button"
import { Moon, Sun, Bookmark, LayoutGrid, LogOut } from "lucide-react"
import { useAuthStore } from "@/features/auth/model/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { user, logout } = useAuthStore()
  const { navigate } = useRouter()

  const handleLogout = () => {
    logout()
    navigate({ to: "/login" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted/20 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
               <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-black uppercase tracking-[0.25em] text-lg sm:inline-block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              CineDash
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 data-[state=active]:opacity-100 data-[state=active]:text-primary"
            >
              Principal
            </Link>
            <Link 
              to="/watchlist" 
              className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 data-[state=active]:opacity-100 data-[state=active]:text-primary"
            >
              Minha Lista
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-500"
            title={theme === "light" ? "Mudar para Dark" : "Mudar para Light"}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 animate-in zoom-in spin-in duration-500" />
            ) : (
              <Sun className="h-5 w-5 animate-in zoom-in spin-in-180 duration-500" />
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full p-0 border-2 border-transparent hover:border-primary/20 transition-all shadow-sm"
              >
                <div className="h-full w-full flex items-center justify-center rounded-full bg-primary/10 text-primary font-black uppercase tracking-tighter text-xs">
                  {user?.username?.substring(0, 2) || "U"}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] rounded-2xl border-muted/20 shadow-2xl backdrop-blur-md">
              <DropdownMenuLabel className="flex flex-col gap-1 p-3">
                <span className="text-sm font-black whitespace-nowrap">Olá, {user?.username}</span>
                <span className="text-xs text-muted-foreground font-medium truncate">{user?.username}@tmdb.com</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/watchlist" className="cursor-pointer gap-2 py-2">
                  <Bookmark className="h-4 w-4 text-primary" /> Minha Lista
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-destructive focus:text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Sair da conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
