import { 
  createRootRoute, 
  createRoute, 
  createRouter 
} from '@tanstack/react-router'
import { RootLayout } from './RootLayout'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { WatchlistPage } from '@/pages/watchlist'
import { MovieDetailPage } from '@/pages/movie-detail'

const rootRoute = createRootRoute({
  component: RootLayout,
})

import { useAuthStore } from '@/features/auth/model/store'
import { redirect } from '@tanstack/react-router'

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
})

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: WatchlistPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$movieId',
  component: MovieDetailPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
})


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  watchlistRoute,
  movieDetailRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
