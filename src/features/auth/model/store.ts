import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
}

interface AuthState {
  token: string | null
  sessionId: string | null
  user: User | null
  isAuthenticated: boolean
  login: (username: string, sessionId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      sessionId: null,
      user: null,
      isAuthenticated: false,
      login: (username: string, sessionId: string) => {
        set({ sessionId, user: { username }, isAuthenticated: true })
      },
      logout: () => {
        set({ token: null, sessionId: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)


