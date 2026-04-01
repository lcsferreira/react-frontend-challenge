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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: WatchlistPage,
})

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$movieId',
  component: MovieDetailPage,
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
