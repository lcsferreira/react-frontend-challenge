import { Outlet } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/model/store"
import { useThemeStore } from "@/shared/model/themeStore"
import { Header } from "@/shared/ui/header"
import { Toaster } from "@/shared/ui/sonner"
import { cn } from "@/shared/lib/utils"
import { useEffect } from "react"

export function RootLayout() {
  const { isAuthenticated } = useAuthStore()
  const { theme } = useThemeStore()

  // Apply theme to body
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <div className={cn(
        "min-h-screen flex flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/10 selection:text-primary transition-colors duration-300",
        theme
    )}>
      {isAuthenticated && <Header />}

      <main className={cn(
          "flex-1 overflow-x-hidden",
          !isAuthenticated ? "flex items-center justify-center bg-muted/20" : "pt-6 pb-12"
      )}>
        <Outlet />
      </main>

      {isAuthenticated && (
        <footer className="border-t border-muted/10 py-8 bg-muted/5">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-6">
            <p className="text-center text-sm leading-loose text-muted-foreground/60 md:text-left font-medium">
              Built with ❤️ for streaming curators. Powered by <span className="text-foreground font-black">TMDB API</span>.
            </p>
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                <span>© 2026 CineDash</span>
                <span className="h-4 w-[1px] bg-muted/20" />
                <span>Premium Access</span>
            </div>
          </div>
        </footer>
      )}

      <Toaster position="top-right" closeButton richColors />
    </div>
  )
}

