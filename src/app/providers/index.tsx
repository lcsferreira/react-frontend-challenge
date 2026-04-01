import { ThemeProvider } from './ThemeProvider'
import { QueryClientProvider } from './QueryClientProvider'
import { Toaster } from '@/shared/ui/sonner'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
